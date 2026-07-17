from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from model import PerformancePredictionModel
from database import HRDatabase
import os
import csv
import io
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Initialize database and ML model
db = HRDatabase()
predictor = PerformancePredictionModel()

@app.before_request
def load_model():
    """Load model on first request"""
    if predictor.model is None:
        try:
            predictor.load_model()
        except FileNotFoundError:
            print("Model not found. Please train model first.")

# --- HEALTH AND SYSTEM INFO ---
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'model_loaded': predictor.model is not None
    }), 200

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    try:
        if predictor.model is None:
            predictor.load_model()
        
        return jsonify({
            'model_type': 'Random Forest Classifier',
            'n_estimators': predictor.model.n_estimators if predictor.model else 100,
            'features': predictor.feature_names,
            'classes': list(predictor.label_encoder.classes_) if predictor.model else ["High Performer", "Medium Performer", "Low Performer"]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- AUTH ENDPOINTS ---
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "Employee")
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
            
        user = db.get_user_by_email(email)
        if not user:
            # Create a user matching input on the fly (guest/auto-register)
            name_part = email.split('@')[0].replace('.', ' ').title()
            user = {
                "id": "U_" + email.split('@')[0].upper().replace('.', '_'),
                "name": name_part,
                "email": email,
                "role": role,
                "department": "Human Resources" if role == "HR Manager" else "Engineering" if role == "Administrator" else "General",
                "avatar": email[:2].upper(),
                "position": role
            }
            db.add_user(email, user)
            
        # Update/override role to match request
        user["role"] = role
        db.add_user(email, user)
        
        return jsonify({
            "success": True,
            "user": user
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json() or {}
        name = data.get("name")
        email = data.get("email")
        role = data.get("role", "Employee")
        
        if not email or not name:
            return jsonify({"error": "Name and email are required"}), 400
            
        avatar = "".join([n[0] for n in name.split()]).upper()[:2]
        user = {
            "id": "U_" + email.split('@')[0].upper().replace('.', '_'),
            "name": name,
            "email": email,
            "role": role,
            "department": "Human Resources" if role == "HR Manager" else "General",
            "avatar": avatar,
            "position": role
        }
        db.add_user(email, user)
        return jsonify({
            "success": True,
            "user": user
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    return jsonify({"success": True, "message": "Logged out successfully"}), 200

@app.route('/api/auth/me', methods=['GET'])
def me():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return jsonify({"error": "Unauthorized"}), 401
    
    token_id = auth_header.split(" ")[1]
    # Search for user with matching ID
    for email, user in db.data.get("users", {}).items():
        if user["id"] == token_id:
            return jsonify(user), 200
            
    return jsonify({"error": "User session not found"}), 404

# --- EMPLOYEES ENDPOINTS ---
@app.route('/api/employees', methods=['GET', 'POST'])
def employees():
    if request.method == 'GET':
        return jsonify(db.get_employees()), 200
    elif request.method == 'POST':
        data = request.get_json() or {}
        required = ["name", "email", "department", "position"]
        for r in required:
            if r not in data:
                return jsonify({"error": f"Missing field: {r}"}), 400
        new_emp = db.add_employee(data)
        return jsonify(new_emp), 201

@app.route('/api/employees/<id>', methods=['GET', 'PUT', 'DELETE'])
def employee_detail(id):
    if request.method == 'GET':
        emp = db.get_employee(id)
        if not emp:
            return jsonify({"error": "Employee not found"}), 404
        return jsonify(emp), 200
        
    elif request.method == 'PUT':
        data = request.get_json() or {}
        updated = db.update_employee(id, data)
        if not updated:
            return jsonify({"error": "Employee not found"}), 404
        return jsonify(updated), 200
        
    elif request.method == 'DELETE':
        deleted = db.delete_employee(id)
        if not deleted:
            return jsonify({"error": "Employee not found"}), 404
        return jsonify({"success": True, "employee": deleted}), 200

# --- DEPARTMENTS ENDPOINTS ---
@app.route('/api/departments', methods=['GET', 'POST'])
def departments():
    if request.method == 'GET':
        return jsonify(db.get_departments()), 200
    elif request.method == 'POST':
        data = request.get_json() or {}
        required = ["name", "code", "headOfDept", "budget", "location", "description"]
        for r in required:
            if r not in data:
                return jsonify({"error": f"Missing field: {r}"}), 400
        new_dept = db.add_department(data)
        return jsonify(new_dept), 201

@app.route('/api/departments/<id>', methods=['GET', 'PUT', 'DELETE'])
def department_detail(id):
    if request.method == 'GET':
        dept = db.get_department(id)
        if not dept:
            return jsonify({"error": "Department not found"}), 404
        return jsonify(dept), 200
        
    elif request.method == 'PUT':
        data = request.get_json() or {}
        updated = db.update_department(id, data)
        if not updated:
            return jsonify({"error": "Department not found"}), 404
        return jsonify(updated), 200
        
    elif request.method == 'DELETE':
        deleted = db.delete_department(id)
        if not deleted:
            return jsonify({"error": "Department not found"}), 404
        return jsonify({"success": True, "department": deleted}), 200

# --- ATTENDANCE ENDPOINTS ---
@app.route('/api/attendance', methods=['GET'])
def attendance_all():
    return jsonify(db.get_attendance()), 200

@app.route('/api/attendance/employee/<employeeId>', methods=['GET'])
def attendance_employee(employeeId):
    return jsonify(db.get_attendance_by_employee(employeeId)), 200

@app.route('/api/attendance/date/<date_str>', methods=['GET'])
def attendance_date(date_str):
    return jsonify(db.get_attendance_by_date(date_str)), 200

@app.route('/api/attendance/check-in', methods=['POST'])
def check_in():
    data = request.get_json() or {}
    employee_id = data.get("employeeId")
    if not employee_id:
        return jsonify({"error": "employeeId is required"}), 400
    try:
        record = db.check_in(employee_id)
        return jsonify(record), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/attendance/check-out', methods=['POST'])
def check_out():
    data = request.get_json() or {}
    employee_id = data.get("employeeId")
    if not employee_id:
        return jsonify({"error": "employeeId is required"}), 400
    try:
        record = db.check_out(employee_id)
        return jsonify(record), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- PERFORMANCE ENDPOINTS ---
@app.route('/api/performance', methods=['GET', 'POST'])
def performance():
    if request.method == 'GET':
        return jsonify(db.get_performance()), 200
    elif request.method == 'POST':
        data = request.get_json() or {}
        required = ["employeeId", "reviewPeriod", "reviewedBy"]
        for r in required:
            if r not in data:
                return jsonify({"error": f"Missing field: {r}"}), 400
        new_pr = db.add_performance(data)
        return jsonify(new_pr), 201

@app.route('/api/performance/<id>', methods=['PUT'])
def performance_update(id):
    data = request.get_json() or {}
    updated = db.update_performance(id, data)
    if not updated:
        return jsonify({"error": "Performance review not found"}), 404
    return jsonify(updated), 200

@app.route('/api/performance/employee/<employeeId>', methods=['GET'])
def performance_employee(employeeId):
    return jsonify(db.get_performance_by_employee(employeeId)), 200

# --- AI PREDICTION ENDPOINTS ---
@app.route('/api/predictions', methods=['GET', 'POST'])
def predictions():
    if request.method == 'GET':
        return jsonify(db.get_predictions()), 200
    elif request.method == 'POST':
        # Handles direct model query: POST /api/predictions
        try:
            data = request.get_json() or {}
            required = ['attendance', 'experience', 'kpi', 'training', 'leave', 'previousRating']
            for field in required:
                if field not in data:
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            
            result = predictor.predict(data)
            return jsonify({
                'success': True,
                'prediction': result['prediction'],
                'confidence': result['confidence'],
                'featureImportance': result['featureImportance'],
                'confidenceScores': result['confidenceScores']
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/api/predictions/employee/<employeeId>', methods=['GET'])
def predictions_employee(employeeId):
    return jsonify(db.get_predictions_by_employee(employeeId)), 200

@app.route('/api/predictions/predict', methods=['POST'])
def run_employee_prediction():
    """Predict and store under employeeId"""
    try:
        data = request.get_json() or {}
        employee_id = data.get("employeeId")
        if not employee_id:
            return jsonify({"error": "employeeId is required"}), 400
            
        emp = db.get_employee(employee_id)
        if not emp:
            return jsonify({"error": "Employee not found"}), 404
            
        # Call model to get prediction
        result = predictor.predict(data)
        
        # Recommendations & risk factors generator based on thresholds
        recommendations = []
        risk_factors = []
        
        if data.get("attendance", 100) < 80:
            risk_factors.append("High absenteeism detected")
            recommendations.append("Reduce unapproved absences through engagement programme")
        if data.get("kpi", 100) < 70:
            risk_factors.append("KPI achievement score below target")
            recommendations.append("Initiate weekly monitoring with line manager")
        if data.get("training", 100) < 50:
            risk_factors.append("Below average training completion")
            recommendations.append("Enrol in core role-specific training sessions")
        if data.get("leave", 0) > 20:
            risk_factors.append("Leave frequency is high, impacting delivery")
            recommendations.append("Review workload distribution and resource buffers")
            
        # Fallback to defaults
        if result['prediction'] == "High Performer":
            recommendations.extend(["Nominate for Leadership track", "Provide mentoring responsibilities"])
            risk_factors.append("None significant")
        elif result['prediction'] == "Medium Performer":
            recommendations.extend(["Set targeted improvement plans", "Check in quarterly on career goals"])
            risk_factors.append("Moderate workload strain")
        else:
            recommendations.extend(["Initiate Performance Improvement Plan (PIP)", "Weekly 1-on-1 performance review"])
            risk_factors.append("Consistent underperformance signals")
            
        pred_record = {
            "id": f"AI{len(db.get_predictions()) + 1:03d}",
            "employeeId": employee_id,
            "employeeName": emp["name"],
            "department": emp["department"],
            "predictionDate": datetime.now().strftime("%Y-%m-%d"),
            "prediction": result["prediction"],
            "confidence": round(result["confidence"]),
            "attendanceScore": data.get("attendance", 80),
            "experienceScore": data.get("experience", 70),
            "kpiScore": data.get("kpi", 75),
            "trainingScore": data.get("training", 60),
            "leaveImpact": data.get("leave", 5),
            "previousRating": data.get("previousRating", 70),
            "featureImportance": result["featureImportance"],
            "recommendations": recommendations[:3],
            "riskFactors": risk_factors[:3]
        }
        
        db.add_prediction(pred_record)
        
        # Create a notification on performance ready
        notif = {
            "id": f"N{len(db.get_notifications()) + 1:03d}",
            "type": "ai_prediction_ready",
            "title": "AI Prediction Ready",
            "message": f"AI performance prediction completed for {emp['name']}: {result['prediction']}.",
            "timestamp": datetime.now().isoformat(),
            "read": False,
            "priority": "high" if result["prediction"] == "Low Performer" else "medium",
            "avatar": emp["avatar"],
            "employeeId": employee_id
        }
        db.data.get("notifications", []).insert(0, notif)
        db.save()
        
        return jsonify(pred_record), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- ANALYTICS ENDPOINTS ---
@app.route('/api/analytics/dashboard', methods=['GET'])
def analytics_dashboard():
    return jsonify(db.get_analytics_dashboard()), 200

@app.route('/api/analytics/employee-growth', methods=['GET'])
def employee_growth():
    return jsonify(db.get_analytics_employee_growth()), 200

@app.route('/api/analytics/attendance-trend', methods=['GET'])
def attendance_trend():
    return jsonify(db.get_analytics_attendance_trend()), 200

@app.route('/api/analytics/performance-distribution', methods=['GET'])
def performance_distribution():
    return jsonify(db.get_analytics_performance_distribution()), 200

# --- NOTIFICATIONS ENDPOINTS ---
@app.route('/api/notifications', methods=['GET'])
def notifications():
    return jsonify(db.get_notifications()), 200

@app.route('/api/notifications/<id>/read', methods=['PATCH'])
def read_notification(id):
    updated = db.mark_notification_read(id)
    if not updated:
        return jsonify({"error": "Notification not found"}), 404
    return jsonify(updated), 200

@app.route('/api/notifications/read-all', methods=['PATCH'])
def read_all_notifications():
    count = db.mark_all_notifications_read()
    return jsonify({"success": True, "marked_count": count}), 200

@app.route('/api/notifications/<id>', methods=['DELETE'])
def delete_notification(id):
    deleted = db.delete_notification(id)
    if not deleted:
        return jsonify({"error": "Notification not found"}), 404
    return jsonify({"success": True, "notification": deleted}), 200

# --- REPORT ENDPOINTS & EXPORTS ---
@app.route('/api/reports/employees', methods=['GET'])
def report_employees():
    return jsonify(db.get_employees()), 200

@app.route('/api/reports/attendance', methods=['GET'])
def report_attendance():
    month = request.args.get("month")
    year = request.args.get("year")
    attendance = db.get_attendance()
    if month and year:
        # Match dates YYYY-MM
        pattern = f"{year}-{month.zfill(2)}"
        attendance = [a for a in attendance if a["date"].startswith(pattern)]
    return jsonify(attendance), 200

@app.route('/api/reports/performance', methods=['GET'])
def report_performance():
    period = request.args.get("period")
    reviews = db.get_performance()
    if period:
        reviews = [r for r in reviews if r.get("reviewPeriod") == period]
    return jsonify(reviews), 200

@app.route('/api/reports/predictions', methods=['GET'])
def report_predictions():
    return jsonify(db.get_predictions()), 200

@app.route('/api/reports/export/pdf', methods=['POST'])
def export_pdf():
    data = request.get_json() or {}
    report_type = data.get("type", "employees")
    
    # Generate simple PDF contents (Text format disguised as binary PDF stream)
    pdf_buffer = io.BytesIO()
    pdf_buffer.write(b"%PDF-1.4\n")
    pdf_buffer.write(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    pdf_buffer.write(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    pdf_buffer.write(f"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n".encode())
    
    # Plain text content inside the PDF
    content = f"HRMS {report_type.upper()} REPORT\nGenerated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    if report_type == "employees":
        for emp in db.get_employees():
            content += f"- {emp['id']}: {emp['name']} | {emp['department']} | {emp['position']}\n"
    elif report_type == "attendance":
        for att in db.get_attendance():
            content += f"- {att['date']}: {att['employeeName']} | {att['status']} | Hours: {att['hoursWorked']}\n"
    else:
        for pr in db.get_performance():
            content += f"- {pr['reviewPeriod']}: {pr['employeeName']} | Score: {pr['overallScore']} | {pr['recommendation']}\n"
            
    content_bytes = content.encode("utf-8")
    stream_content = f"<< /Length {len(content_bytes)} >>\nstream\n".encode() + content_bytes + b"\nendstream\nendobj\n"
    pdf_buffer.write(stream_content)
    pdf_buffer.write(b"xref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000210 00000 n\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n310\n%%EOF\n")
    
    pdf_buffer.seek(0)
    response = make_response(pdf_buffer.read())
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename={report_type}_report.pdf'
    return response

@app.route('/api/reports/export/excel', methods=['POST'])
def export_excel():
    data = request.get_json() or {}
    report_type = data.get("type", "employees")
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    if report_type == "employees":
        writer.writerow(["ID", "Name", "Email", "Phone", "Department", "Position", "Status", "Salary", "Score"])
        for emp in db.get_employees():
            writer.writerow([emp["id"], emp["name"], emp["email"], emp["phone"], emp["department"], emp["position"], emp["status"], emp["salary"], emp["performanceScore"]])
    elif report_type == "attendance":
        writer.writerow(["ID", "Employee ID", "Employee Name", "Department", "Date", "Check In", "Check Out", "Status", "Hours Worked"])
        for att in db.get_attendance():
            writer.writerow([att["id"], att["employeeId"], att["employeeName"], att["department"], att["date"], att["checkIn"], att["checkOut"], att["status"], att["hoursWorked"]])
    else:
        writer.writerow(["ID", "Employee ID", "Employee Name", "Department", "Period", "Overall Score", "Recommendation", "Status"])
        for pr in db.get_performance():
            writer.writerow([pr["id"], pr["employeeId"], pr["employeeName"], pr["department"], pr["reviewPeriod"], pr["overallScore"], pr["recommendation"], pr["status"]])
            
    response = make_response(output.getvalue())
    response.headers['Content-Type'] = 'text/csv'
    response.headers['Content-Disposition'] = f'attachment; filename={report_type}_report.csv'
    return response

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5678")
    app.run(debug=True, host='0.0.0.0', port=5678)
