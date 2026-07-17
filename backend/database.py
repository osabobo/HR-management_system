import os
import json
from datetime import datetime

DB_FILE = os.path.join(os.path.dirname(__file__), 'db.json')

class HRDatabase:
    def __init__(self):
        self.data = {}
        self.load()

    def load(self):
        if os.path.exists(DB_FILE):
            try:
                with open(DB_FILE, 'r', encoding='utf-8') as f:
                    self.data = json.load(f)
                    print(f"Database loaded from {DB_FILE}")
                    return
            except Exception as e:
                print(f"Error loading database, re-seeding: {e}")
        self.seed()

    def save(self):
        try:
            with open(DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving database: {e}")

    def seed(self):
        print("Seeding database with default mock data...")
        self.data = {
            "users": {
                "admin@hrms.ng": {
                    "id": "U001",
                    "name": "Chukwuemeka Nwosu",
                    "email": "admin@hrms.ng",
                    "role": "Administrator",
                    "department": "Engineering",
                    "avatar": "CN",
                    "position": "System Administrator"
                },
                "hr@hrms.ng": {
                    "id": "U002",
                    "name": "Fatima Al-Amin",
                    "email": "hr@hrms.ng",
                    "role": "HR Manager",
                    "department": "Human Resources",
                    "avatar": "FA",
                    "position": "HR Manager"
                },
                "emp@hrms.ng": {
                    "id": "U003",
                    "name": "Adaeze Okonkwo",
                    "email": "emp@hrms.ng",
                    "role": "Employee",
                    "department": "Engineering",
                    "avatar": "AO",
                    "position": "Senior Software Engineer"
                }
            },
            "employees": [
                { "id": "EMP001", "name": "Adaeze Okonkwo", "email": "adaeze.okonkwo@company.ng", "phone": "+234 812 345 6789", "department": "Engineering", "position": "Senior Software Engineer", "status": "Active", "gender": "Female", "hireDate": "2021-03-15", "salary": 420000, "performanceScore": 92, "avatar": "AO", "experience": 5, "trainingCompleted": 8, "location": "Lagos", "manager": "Emeka Nwosu" },
                { "id": "EMP002", "name": "Chukwuemeka Nwosu", "email": "emeka.nwosu@company.ng", "phone": "+234 803 456 7890", "department": "Engineering", "position": "Engineering Manager", "status": "Active", "gender": "Male", "hireDate": "2019-07-01", "salary": 580000, "performanceScore": 88, "avatar": "CN", "experience": 8, "trainingCompleted": 12, "location": "Lagos", "manager": "CEO" },
                { "id": "EMP003", "name": "Fatima Al-Amin", "email": "fatima.alamin@company.ng", "phone": "+234 705 678 9012", "department": "Human Resources", "position": "HR Manager", "status": "Active", "gender": "Female", "hireDate": "2020-01-10", "salary": 390000, "performanceScore": 95, "avatar": "FA", "experience": 6, "trainingCompleted": 10, "location": "Abuja", "manager": "CEO" },
                { "id": "EMP004", "name": "Babatunde Adeleke", "email": "babatunde.adeleke@company.ng", "phone": "+234 901 789 0123", "department": "Sales", "position": "Sales Representative", "status": "Active", "gender": "Male", "hireDate": "2022-05-20", "salary": 280000, "performanceScore": 74, "avatar": "BA", "experience": 3, "trainingCompleted": 4, "location": "Lagos", "manager": "Ngozi Eze" },
                { "id": "EMP005", "name": "Ngozi Eze", "email": "ngozi.eze@company.ng", "phone": "+234 816 890 1234", "department": "Sales", "position": "Sales Manager", "status": "Active", "gender": "Female", "hireDate": "2018-11-05", "salary": 480000, "performanceScore": 87, "avatar": "NE", "experience": 9, "trainingCompleted": 14, "location": "Port Harcourt", "manager": "CEO" },
                { "id": "EMP006", "name": "Ibrahim Musa", "email": "ibrahim.musa@company.ng", "phone": "+234 702 901 2345", "department": "Finance", "position": "Financial Analyst", "status": "On Leave", "gender": "Male", "hireDate": "2021-09-12", "salary": 340000, "performanceScore": 79, "avatar": "IM", "experience": 4, "trainingCompleted": 6, "location": "Kano", "manager": "Yetunde Coker" },
                { "id": "EMP007", "name": "Yetunde Coker", "email": "yetunde.coker@company.ng", "phone": "+234 808 012 3456", "department": "Finance", "position": "Finance Director", "status": "Active", "gender": "Female", "hireDate": "2017-04-18", "salary": 650000, "performanceScore": 91, "avatar": "YC", "experience": 12, "trainingCompleted": 18, "location": "Lagos", "manager": "CEO" },
                { "id": "EMP008", "name": "Obinna Chukwu", "email": "obinna.chukwu@company.ng", "phone": "+234 903 123 4567", "department": "Customer Support", "position": "Support Specialist", "status": "Active", "gender": "Male", "hireDate": "2023-01-09", "salary": 190000, "performanceScore": 68, "avatar": "OC", "experience": 1, "trainingCompleted": 3, "location": "Enugu", "manager": "Sade Williams" },
                { "id": "EMP009", "name": "Sade Williams", "email": "sade.williams@company.ng", "phone": "+234 811 234 5678", "department": "Customer Support", "position": "Support Manager", "status": "Active", "gender": "Female", "hireDate": "2020-06-22", "salary": 360000, "performanceScore": 83, "avatar": "SW", "experience": 7, "trainingCompleted": 9, "location": "Lagos", "manager": "CEO" },
                { "id": "EMP010", "name": "Abdullahi Garba", "email": "abdullahi.garba@company.ng", "phone": "+234 704 345 6789", "department": "Marketing", "position": "Marketing Specialist", "status": "Active", "gender": "Male", "hireDate": "2022-03-14", "salary": 260000, "performanceScore": 76, "avatar": "AG", "experience": 2, "trainingCompleted": 5, "location": "Abuja", "manager": "Chiamaka Obi" },
                { "id": "EMP011", "name": "Chiamaka Obi", "email": "chiamaka.obi@company.ng", "phone": "+234 815 456 7890", "department": "Marketing", "position": "Marketing Manager", "status": "Active", "gender": "Female", "hireDate": "2019-02-28", "salary": 440000, "performanceScore": 90, "avatar": "CO", "experience": 8, "trainingCompleted": 11, "location": "Lagos", "manager": "CEO" },
                { "id": "EMP012", "name": "Usman Bello", "email": "usman.bello@company.ng", "phone": "+234 901 567 8901", "department": "Engineering", "position": "Junior Developer", "status": "Active", "gender": "Male", "hireDate": "2023-08-01", "salary": 200000, "performanceScore": 72, "avatar": "UB", "experience": 1, "trainingCompleted": 2, "location": "Abuja", "manager": "Chukwuemeka Nwosu" },
                { "id": "EMP013", "name": "Aisha Suleiman", "email": "aisha.suleiman@company.ng", "phone": "+234 806 678 9012", "department": "Human Resources", "position": "HR Officer", "status": "Active", "gender": "Female", "hireDate": "2022-11-15", "salary": 240000, "performanceScore": 81, "avatar": "AS", "experience": 3, "trainingCompleted": 7, "location": "Kano", "manager": "Fatima Al-Amin" },
                { "id": "EMP014", "name": "Tunde Bakare", "email": "tunde.bakare@company.ng", "phone": "+234 703 789 0123", "department": "Sales", "position": "Sales Executive", "status": "Suspended", "gender": "Male", "hireDate": "2021-07-30", "salary": 250000, "performanceScore": 55, "avatar": "TB", "experience": 4, "trainingCompleted": 3, "location": "Ibadan", "manager": "Ngozi Eze" },
                { "id": "EMP015", "name": "Oluwakemi Adeyemi", "email": "kemi.adeyemi@company.ng", "phone": "+234 812 890 1234", "department": "Operations", "position": "Operations Analyst", "status": "Active", "gender": "Female", "hireDate": "2020-09-07", "salary": 310000, "performanceScore": 85, "avatar": "OA", "experience": 5, "trainingCompleted": 8, "location": "Lagos", "manager": "CEO" },
                { "id": "EMP016", "name": "Emeka Ogbu", "email": "emeka.ogbu@company.ng", "phone": "+234 805 901 2345", "department": "Engineering", "position": "DevOps Engineer", "status": "Active", "gender": "Male", "hireDate": "2020-12-01", "salary": 380000, "performanceScore": 89, "avatar": "EO", "experience": 6, "trainingCompleted": 10, "location": "Lagos", "manager": "Chukwuemeka Nwosu" },
                { "id": "EMP017", "name": "Hauwa Ibrahim", "email": "hauwa.ibrahim@company.ng", "phone": "+234 708 012 3456", "department": "Marketing", "position": "Content Creator", "status": "Active", "gender": "Female", "hireDate": "2023-02-20", "salary": 210000, "performanceScore": 78, "avatar": "HI", "experience": 2, "trainingCompleted": 4, "location": "Kaduna", "manager": "Chiamaka Obi" },
                { "id": "EMP018", "name": "Chidi Okeke", "email": "chidi.okeke@company.ng", "phone": "+234 901 123 4567", "department": "Finance", "position": "Accountant", "status": "On Leave", "gender": "Male", "hireDate": "2021-05-17", "salary": 295000, "performanceScore": 77, "avatar": "CO", "experience": 4, "trainingCompleted": 6, "location": "Onitsha", "manager": "Yetunde Coker" },
                { "id": "EMP019", "name": "Bola Fashola", "email": "bola.fashola@company.ng", "phone": "+234 813 234 5678", "department": "Operations", "position": "Operations Manager", "status": "Active", "gender": "Male", "hireDate": "2018-08-22", "salary": 520000, "performanceScore": 93, "avatar": "BF", "experience": 10, "trainingCompleted": 15, "location": "Lagos", "manager": "CEO" },
                { "id": "EMP020", "name": "Grace Adeola", "email": "grace.adeola@company.ng", "phone": "+234 704 345 6780", "department": "Customer Support", "position": "QA Analyst", "status": "Active", "gender": "Female", "hireDate": "2022-09-12", "salary": 230000, "performanceScore": 82, "avatar": "GA", "experience": 3, "trainingCompleted": 5, "location": "Lagos", "manager": "Sade Williams" }
            ],
            "departments": [
                { "id": "DEPT001", "name": "Engineering", "code": "ENG", "headOfDept": "Chukwuemeka Nwosu", "employeeCount": 5, "budget": 5000000, "budgetUsed": 3800000, "productivity": 91, "location": "Lagos", "description": "Responsible for product development, software engineering, and technical infrastructure.", "color": "#4f46e5", "icon": "FiCode", "established": "2017-01-01" },
                { "id": "DEPT002", "name": "Human Resources", "code": "HR", "headOfDept": "Fatima Al-Amin", "employeeCount": 2, "budget": 2000000, "budgetUsed": 1350000, "productivity": 88, "location": "Abuja", "description": "Manages recruitment, employee relations, payroll, and organisational development.", "color": "#10b981", "icon": "FiUsers", "established": "2017-01-01" },
                { "id": "DEPT003", "name": "Sales", "code": "SLS", "headOfDept": "Ngozi Eze", "employeeCount": 3, "budget": 3500000, "budgetUsed": 2700000, "productivity": 79, "location": "Port Harcourt", "description": "Drives revenue growth through B2B and B2C sales strategies and client relationship management.", "color": "#f59e0b", "icon": "FiTrendingUp", "established": "2017-01-01" },
                { "id": "DEPT004", "name": "Finance", "code": "FIN", "headOfDept": "Yetunde Coker", "employeeCount": 3, "budget": 2500000, "budgetUsed": 1600000, "productivity": 85, "location": "Lagos", "description": "Oversees financial planning, reporting, budgeting, and statutory compliance.", "color": "#06b6d4", "icon": "FiDollarSign", "established": "2017-01-01" },
                { "id": "DEPT005", "name": "Customer Support", "code": "CS", "headOfDept": "Sade Williams", "employeeCount": 3, "budget": 1800000, "budgetUsed": 1200000, "productivity": 82, "location": "Lagos", "description": "Ensures excellent post-sale customer experience, ticketing, and technical support.", "color": "#8b5cf6", "icon": "FiHeadphones", "established": "2018-03-01" },
                { "id": "DEPT006", "name": "Marketing", "code": "MKT", "headOfDept": "Chiamaka Obi", "employeeCount": 3, "budget": 2800000, "budgetUsed": 2100000, "productivity": 86, "location": "Lagos", "description": "Responsible for brand management, digital marketing, content strategy, and campaigns.", "color": "#f43f5e", "icon": "FiBarChart2", "established": "2017-06-01" },
                { "id": "DEPT007", "name": "Operations", "code": "OPS", "headOfDept": "Bola Fashola", "employeeCount": 2, "budget": 3200000, "budgetUsed": 2400000, "productivity": 89, "location": "Lagos", "description": "Manages business operations, logistics, process optimisation and cross-departmental coordination.", "color": "#14b8a6", "icon": "FiSettings", "established": "2017-01-01" }
            ],
            "attendance": [
                { "id": "ATT001", "employeeId": "EMP001", "employeeName": "Adaeze Okonkwo", "department": "Engineering", "date": "2026-07-06", "checkIn": "08:02", "checkOut": "17:15", "status": "Present", "hoursWorked": 9.2 },
                { "id": "ATT002", "employeeId": "EMP002", "employeeName": "Chukwuemeka Nwosu", "department": "Engineering", "date": "2026-07-06", "checkIn": "07:55", "checkOut": "18:00", "status": "Present", "hoursWorked": 10.1 },
                { "id": "ATT003", "employeeId": "EMP003", "employeeName": "Fatima Al-Amin", "department": "Human Resources", "date": "2026-07-06", "checkIn": "09:20", "checkOut": "17:00", "status": "Late", "hoursWorked": 7.7, "notes": "Traffic delay reported" },
                { "id": "ATT004", "employeeId": "EMP004", "employeeName": "Babatunde Adeleke", "department": "Sales", "date": "2026-07-06", "checkIn": "08:30", "checkOut": "17:30", "status": "Present", "hoursWorked": 9.0 },
                { "id": "ATT005", "employeeId": "EMP005", "employeeName": "Ngozi Eze", "department": "Sales", "date": "2026-07-06", "checkIn": None, "checkOut": None, "status": "Absent", "hoursWorked": 0 },
                { "id": "ATT006", "employeeId": "EMP006", "employeeName": "Ibrahim Musa", "department": "Finance", "date": "2026-07-06", "checkIn": None, "checkOut": None, "status": "Leave", "hoursWorked": 0, "notes": "Annual leave approved" },
                { "id": "ATT007", "employeeId": "EMP007", "employeeName": "Yetunde Coker", "department": "Finance", "date": "2026-07-06", "checkIn": "08:00", "checkOut": "17:00", "status": "Present", "hoursWorked": 9.0 },
                { "id": "ATT008", "employeeId": "EMP008", "employeeName": "Obinna Chukwu", "department": "Customer Support", "date": "2026-07-06", "checkIn": "08:45", "checkOut": "17:15", "status": "Present", "hoursWorked": 8.5 },
                { "id": "ATT009", "employeeId": "EMP009", "employeeName": "Sade Williams", "department": "Customer Support", "date": "2026-07-06", "checkIn": "08:05", "checkOut": "18:30", "status": "Present", "hoursWorked": 10.4 },
                { "id": "ATT010", "employeeId": "EMP010", "employeeName": "Abdullahi Garba", "department": "Marketing", "date": "2026-07-06", "checkIn": "09:00", "checkOut": "17:00", "status": "Present", "hoursWorked": 8.0 }
            ],
            "performance": [
                { "id": "PR001", "employeeId": "EMP001", "employeeName": "Adaeze Okonkwo", "department": "Engineering", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-30", "reviewedBy": "Chukwuemeka Nwosu", "productivity": 95, "teamwork": 90, "leadership": 88, "communication": 92, "innovation": 94, "discipline": 93, "overallScore": 92, "status": "Completed", "comments": "Excellent performance across all KPIs. Led the migration project that reduced downtime by 40%.", "recommendation": "Promote" },
                { "id": "PR002", "employeeId": "EMP002", "employeeName": "Chukwuemeka Nwosu", "department": "Engineering", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-28", "reviewedBy": "CEO", "productivity": 88, "teamwork": 92, "leadership": 95, "communication": 90, "innovation": 85, "discipline": 88, "overallScore": 90, "status": "Completed", "comments": "Consistent delivery and strong team leadership. Pipeline reliability improved by 28%.", "recommendation": "Retain" },
                { "id": "PR003", "employeeId": "EMP003", "employeeName": "Fatima Al-Amin", "department": "Human Resources", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-30", "reviewedBy": "CEO", "productivity": 96, "teamwork": 94, "leadership": 90, "communication": 98, "innovation": 92, "discipline": 95, "overallScore": 94, "status": "Completed", "comments": "Spearheaded the new onboarding programme. Reduced time-to-hire by 22%.", "recommendation": "Promote" },
                { "id": "PR004", "employeeId": "EMP004", "employeeName": "Babatunde Adeleke", "department": "Sales", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-30", "reviewedBy": "Ngozi Eze", "productivity": 72, "teamwork": 78, "leadership": 62, "communication": 80, "innovation": 70, "discipline": 75, "overallScore": 73, "status": "Completed", "comments": "Missed quarterly targets by 15%. Needs to improve prospecting and follow-up discipline.", "recommendation": "Retain" },
                { "id": "PR005", "employeeId": "EMP005", "employeeName": "Ngozi Eze", "department": "Sales", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-27", "reviewedBy": "CEO", "productivity": 88, "teamwork": 86, "leadership": 90, "communication": 88, "innovation": 82, "discipline": 88, "overallScore": 87, "status": "Completed", "comments": "Revenue targets exceeded by 8%. Effective team coaching led to team improvement.", "recommendation": "Retain" },
                { "id": "PR006", "employeeId": "EMP006", "employeeName": "Ibrahim Musa", "department": "Finance", "reviewPeriod": "Q2 2025", "reviewDate": "2025-07-01", "reviewedBy": "Yetunde Coker", "productivity": 80, "teamwork": 78, "leadership": 72, "communication": 82, "innovation": 76, "discipline": 84, "overallScore": 79, "status": "Pending", "comments": "Currently on approved leave. Review to be completed on return.", "recommendation": "Retain" },
                { "id": "PR007", "employeeId": "EMP007", "employeeName": "Yetunde Coker", "department": "Finance", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-25", "reviewedBy": "CEO", "productivity": 92, "teamwork": 90, "leadership": 95, "communication": 90, "innovation": 88, "discipline": 92, "overallScore": 91, "status": "Completed", "comments": "Flawless audit cycle. Implemented cost saving measures saving ₦2.4M annually.", "recommendation": "Promote" },
                { "id": "PR008", "employeeId": "EMP008", "employeeName": "Obinna Chukwu", "department": "Customer Support", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-30", "reviewedBy": "Sade Williams", "productivity": 68, "teamwork": 72, "leadership": 58, "communication": 75, "innovation": 62, "discipline": 70, "overallScore": 68, "status": "Completed", "comments": "Customer satisfaction scores below target. Needs improvement in resolution time.", "recommendation": "Warn" },
                { "id": "PR009", "employeeId": "EMP014", "employeeName": "Tunde Bakare", "department": "Sales", "reviewPeriod": "Q2 2025", "reviewDate": "2025-05-30", "reviewedBy": "Ngozi Eze", "productivity": 50, "teamwork": 58, "leadership": 45, "communication": 62, "innovation": 50, "discipline": 45, "overallScore": 52, "status": "Overdue", "comments": "Repeated policy violations and underperformance. Subject to disciplinary review.", "recommendation": "Dismiss" },
                { "id": "PR010", "employeeId": "EMP019", "employeeName": "Bola Fashola", "department": "Operations", "reviewPeriod": "Q2 2025", "reviewDate": "2025-06-20", "reviewedBy": "CEO", "productivity": 94, "teamwork": 92, "leadership": 96, "communication": 92, "innovation": 90, "discipline": 95, "overallScore": 93, "status": "Completed", "comments": "Operational efficiency improved by 35%. Key driver of company expansion into Port Harcourt.", "recommendation": "Promote" }
            ],
            "predictions": [
                {
                    "id": "AI001", "employeeId": "EMP001", "employeeName": "Adaeze Okonkwo", "department": "Engineering",
                    "predictionDate": "2025-07-01", "prediction": "High Performer", "confidence": 94,
                    "attendanceScore": 96, "experienceScore": 88, "kpiScore": 92, "trainingScore": 85, "leaveImpact": 5, "previousRating": 90,
                    "featureImportance": [
                        { "feature": "KPI Score", "impact": 32, "direction": "positive" },
                        { "feature": "Attendance", "impact": 28, "direction": "positive" },
                        { "feature": "Training Completed", "impact": 18, "direction": "positive" },
                        { "feature": "Experience", "impact": 15, "direction": "positive" },
                        { "feature": "Leave Days", "impact": 7, "direction": "negative" }
                    ],
                    "recommendations": ["Recommend for Senior Lead promotion track", "Assign mentorship role for junior engineers", "Include in leadership development programme"],
                    "riskFactors": ["None significant"]
                },
                {
                    "id": "AI002", "employeeId": "EMP004", "employeeName": "Babatunde Adeleke", "department": "Sales",
                    "predictionDate": "2025-07-01", "prediction": "Medium Performer", "confidence": 78,
                    "attendanceScore": 80, "experienceScore": 65, "kpiScore": 74, "trainingScore": 55, "leaveImpact": 12, "previousRating": 72,
                    "featureImportance": [
                        { "feature": "KPI Score", "impact": 30, "direction": "positive" },
                        { "feature": "Attendance", "impact": 22, "direction": "positive" },
                        { "feature": "Leave Days", "impact": 25, "direction": "negative" },
                        { "feature": "Training Completed", "impact": 15, "direction": "negative" },
                        { "feature": "Experience", "impact": 8, "direction": "positive" }
                    ],
                    "recommendations": ["Enrol in advanced sales techniques training", "Set monthly OKRs with line manager", "Reduce unapproved absences through engagement programme"],
                    "riskFactors": ["High leave frequency", "Below average training completion", "Missed Q2 targets"]
                }
            ],
            "notifications": [
                { "id": "N001", "type": "ai_prediction_ready", "title": "AI Predictions Ready", "message": "5 new employee performance predictions have been generated for Q3 2025.", "timestamp": "2025-07-03T08:30:00", "read": False, "priority": "high" },
                { "id": "N002", "type": "review_reminder", "title": "Performance Review Due", "message": "Ibrahim Musa's Q2 performance review is overdue. Please complete within 48 hours.", "timestamp": "2025-07-03T07:15:00", "read": False, "priority": "high", "avatar": "IM", "employeeId": "EMP006" },
                { "id": "N003", "type": "promotion_recommendation", "title": "Promotion Recommendation", "message": "AI system recommends Adaeze Okonkwo for promotion based on Q2 performance data.", "timestamp": "2025-07-02T16:45:00", "read": False, "priority": "medium", "avatar": "AO", "employeeId": "EMP001" },
                { "id": "N004", "type": "attendance_alert", "title": "Attendance Alert", "message": "Tunde Bakare has been absent for 4 consecutive days without prior notification.", "timestamp": "2025-07-02T09:00:00", "read": True, "priority": "high", "avatar": "TB", "employeeId": "EMP014" },
                { "id": "N005", "type": "system", "title": "System Update", "message": "AI-HRMS has been updated to v2.1.0. New features include improved prediction accuracy and dashboard widgets.", "timestamp": "2025-07-01T23:00:00", "read": True, "priority": "low" }
            ]
        }
        self.save()

    # --- EMPLOYEES CRUD ---
    def get_employees(self):
        return self.data.get("employees", [])

    def get_employee(self, emp_id):
        for e in self.get_employees():
            if e["id"] == emp_id:
                return e
        return None

    def add_employee(self, emp_data):
        employees = self.get_employees()
        if "id" not in emp_data or not emp_data["id"]:
            existing_ids = [int(e["id"].replace("EMP", "")) for e in employees if e["id"].startswith("EMP")]
            new_id_num = max(existing_ids) + 1 if existing_ids else 1
            emp_data["id"] = f"EMP{new_id_num:03d}"
        
        if "avatar" not in emp_data or not emp_data["avatar"]:
            emp_data["avatar"] = "".join([part[0] for part in emp_data.get("name", "").split()]).upper()[:2]
        if "status" not in emp_data:
            emp_data["status"] = "Active"
        if "performanceScore" not in emp_data:
            emp_data["performanceScore"] = 80
        if "trainingCompleted" not in emp_data:
            emp_data["trainingCompleted"] = 0
            
        employees.append(emp_data)
        self.save()
        self.update_department_counts()
        return emp_data

    def update_employee(self, emp_id, emp_data):
        employees = self.get_employees()
        for i, e in enumerate(employees):
            if e["id"] == emp_id:
                updated = {**e, **emp_data}
                updated["id"] = emp_id
                employees[i] = updated
                self.save()
                self.update_department_counts()
                return updated
        return None

    def delete_employee(self, emp_id):
        employees = self.get_employees()
        for i, e in enumerate(employees):
            if e["id"] == emp_id:
                deleted = employees.pop(i)
                self.save()
                self.update_department_counts()
                return deleted
        return None

    # --- DEPARTMENTS CRUD ---
    def get_departments(self):
        return self.data.get("departments", [])

    def get_department(self, dept_id):
        for d in self.get_departments():
            if d["id"] == dept_id:
                return d
        return None

    def add_department(self, dept_data):
        depts = self.get_departments()
        if "id" not in dept_data or not dept_data["id"]:
            existing_ids = [int(d["id"].replace("DEPT", "")) for d in depts if d["id"].startswith("DEPT")]
            new_id_num = max(existing_ids) + 1 if existing_ids else 1
            dept_data["id"] = f"DEPT{new_id_num:03d}"
        
        if "employeeCount" not in dept_data:
            dept_data["employeeCount"] = 0
        if "budgetUsed" not in dept_data:
            dept_data["budgetUsed"] = 0
        if "productivity" not in dept_data:
            dept_data["productivity"] = 85
            
        depts.append(dept_data)
        self.save()
        return dept_data

    def update_department(self, dept_id, dept_data):
        depts = self.get_departments()
        for i, d in enumerate(depts):
            if d["id"] == dept_id:
                updated = {**d, **dept_data}
                updated["id"] = dept_id
                depts[i] = updated
                self.save()
                return updated
        return None

    def delete_department(self, dept_id):
        depts = self.get_departments()
        for i, d in enumerate(depts):
            if d["id"] == dept_id:
                deleted = depts.pop(i)
                self.save()
                return deleted
        return None

    def update_department_counts(self):
        depts = self.get_departments()
        employees = self.get_employees()
        counts = {}
        for emp in employees:
            dept_name = emp.get("department")
            if dept_name:
                counts[dept_name] = counts.get(dept_name, 0) + 1
        for d in depts:
            d["employeeCount"] = counts.get(d["name"], 0)
        self.save()

    # --- ATTENDANCE ---
    def get_attendance(self):
        return self.data.get("attendance", [])

    def get_attendance_by_employee(self, emp_id):
        return [a for a in self.get_attendance() if a["employeeId"] == emp_id]

    def get_attendance_by_date(self, target_date):
        return [a for a in self.get_attendance() if a["date"] == target_date]

    def check_in(self, employee_id):
        today = datetime.now().strftime("%Y-%m-%d")
        now_time = datetime.now().strftime("%H:%M")
        records = self.get_attendance()
        for r in records:
            if r["employeeId"] == employee_id and r["date"] == today:
                if not r["checkIn"]:
                    r["checkIn"] = now_time
                    r["status"] = "Late" if now_time > "09:00" else "Present"
                    self.save()
                return r
        emp = self.get_employee(employee_id)
        if not emp:
            raise ValueError(f"Employee {employee_id} not found")
        existing_ids = [int(r["id"].replace("ATT", "")) for r in records if r["id"].startswith("ATT")]
        new_id_num = max(existing_ids) + 1 if existing_ids else 1
        new_record = {
            "id": f"ATT{new_id_num:03d}",
            "employeeId": employee_id,
            "employeeName": emp["name"],
            "department": emp["department"],
            "date": today,
            "checkIn": now_time,
            "checkOut": None,
            "status": "Late" if now_time > "09:00" else "Present",
            "hoursWorked": 0.0
        }
        records.append(new_record)
        self.save()
        return new_record

    def check_out(self, employee_id):
        today = datetime.now().strftime("%Y-%m-%d")
        now_time = datetime.now().strftime("%H:%M")
        records = self.get_attendance()
        for r in records:
            if r["employeeId"] == employee_id and r["date"] == today:
                r["checkOut"] = now_time
                if r["checkIn"]:
                    try:
                        fmt = "%H:%M"
                        tdelta = datetime.strptime(now_time, fmt) - datetime.strptime(r["checkIn"], fmt)
                        r["hoursWorked"] = round(tdelta.total_seconds() / 3600.0, 1)
                    except Exception:
                        r["hoursWorked"] = 8.0
                else:
                    r["hoursWorked"] = 0.0
                self.save()
                return r
        emp = self.get_employee(employee_id)
        if not emp:
            raise ValueError(f"Employee {employee_id} not found")
        existing_ids = [int(r["id"].replace("ATT", "")) for r in records if r["id"].startswith("ATT")]
        new_id_num = max(existing_ids) + 1 if existing_ids else 1
        new_record = {
            "id": f"ATT{new_id_num:03d}",
            "employeeId": employee_id,
            "employeeName": emp["name"],
            "department": emp["department"],
            "date": today,
            "checkIn": None,
            "checkOut": now_time,
            "status": "Present",
            "hoursWorked": 0.0
        }
        records.append(new_record)
        self.save()
        return new_record

    # --- PERFORMANCE ---
    def get_performance(self):
        return self.data.get("performance", [])

    def get_performance_by_employee(self, emp_id):
        return [p for p in self.get_performance() if p["employeeId"] == emp_id]

    def add_performance(self, review_data):
        reviews = self.get_performance()
        if "id" not in review_data or not review_data["id"]:
            existing_ids = [int(r["id"].replace("PR", "")) for r in reviews if r["id"].startswith("PR")]
            new_id_num = max(existing_ids) + 1 if existing_ids else 1
            review_data["id"] = f"PR{new_id_num:03d}"
        if "overallScore" not in review_data:
            scores = [
                review_data.get("productivity", 80),
                review_data.get("teamwork", 80),
                review_data.get("leadership", 80),
                review_data.get("communication", 80),
                review_data.get("innovation", 80),
                review_data.get("discipline", 80)
            ]
            review_data["overallScore"] = int(sum(scores) / len(scores))
        emp_id = review_data.get("employeeId")
        if emp_id:
            emp = self.get_employee(emp_id)
            if emp:
                emp["performanceScore"] = review_data["overallScore"]
                self.update_employee(emp_id, emp)
                review_data["employeeName"] = emp["name"]
                review_data["department"] = emp["department"]
        reviews.append(review_data)
        self.save()
        return review_data

    def update_performance(self, review_id, review_data):
        reviews = self.get_performance()
        for i, r in enumerate(reviews):
            if r["id"] == review_id:
                updated = {**r, **review_data}
                updated["id"] = review_id
                scores = [
                    updated.get("productivity", 80),
                    updated.get("teamwork", 80),
                    updated.get("leadership", 80),
                    updated.get("communication", 80),
                    updated.get("innovation", 80),
                    updated.get("discipline", 80)
                ]
                updated["overallScore"] = int(sum(scores) / len(scores))
                reviews[i] = updated
                self.save()
                emp_id = updated.get("employeeId")
                if emp_id:
                    emp = self.get_employee(emp_id)
                    if emp:
                        emp["performanceScore"] = updated["overallScore"]
                        self.update_employee(emp_id, emp)
                return updated
        return None

    # --- PREDICTIONS ---
    def get_predictions(self):
        return self.data.get("predictions", [])

    def get_predictions_by_employee(self, emp_id):
        return [p for p in self.get_predictions() if p["employeeId"] == emp_id]

    def add_prediction(self, pred_data):
        preds = self.get_predictions()
        if "id" not in pred_data or not pred_data["id"]:
            existing_ids = [int(p["id"].replace("AI", "")) for p in preds if p["id"].startswith("AI")]
            new_id_num = max(existing_ids) + 1 if existing_ids else 1
            pred_data["id"] = f"AI{new_id_num:03d}"
        preds.append(pred_data)
        self.save()
        return pred_data

    # --- NOTIFICATIONS ---
    def get_notifications(self):
        return self.data.get("notifications", [])

    def mark_notification_read(self, notif_id):
        notifs = self.get_notifications()
        for n in notifs:
            if n["id"] == notif_id:
                n["read"] = True
                self.save()
                return n
        return None

    def mark_all_notifications_read(self):
        notifs = self.get_notifications()
        for n in notifs:
            n["read"] = True
        self.save()
        return len(notifs)

    def delete_notification(self, notif_id):
        notifs = self.get_notifications()
        for i, n in enumerate(notifs):
            if n["id"] == notif_id:
                deleted = notifs.pop(i)
                self.save()
                return deleted
        return None

    # --- USERS / AUTH ---
    def get_user_by_email(self, email):
        return self.data.get("users", {}).get(email)

    def add_user(self, email, user_data):
        self.data.setdefault("users", {})[email] = user_data
        self.save()
        return user_data

    # --- ANALYTICS ---
    def get_analytics_dashboard(self):
        employees = self.get_employees()
        departments = self.get_departments()
        notifs = self.get_notifications()
        
        active_count = sum(1 for e in employees if e.get("status") == "Active")
        high_performers = sum(1 for e in employees if e.get("performanceScore", 0) >= 85)
        avg_perf = int(sum(e.get("performanceScore", 0) for e in employees) / len(employees)) if employees else 0
        unread_notifs = sum(1 for n in notifs if not n.get("read", False))
        
        attendance = self.get_attendance()
        attendance_rate = "89%"
        if attendance:
            p_or_l = sum(1 for a in attendance if a.get("status") in ["Present", "Late"])
            total_slots = len(attendance)
            if total_slots > 0:
                attendance_rate = f"{int(p_or_l / total_slots * 100)}%"

        return {
            "totalEmployees": len(employees),
            "departmentsCount": len(departments),
            "activeEmployees": active_count,
            "unreadNotifications": unread_notifs,
            "highPerformers": high_performers,
            "averagePerformance": avg_perf,
            "attendanceRate": attendance_rate,
            "aiPredictionsCount": len(self.get_predictions())
        }

    def get_analytics_employee_growth(self):
        return [
            { "month": "Jan", "Engineering": 3, "Sales": 2, "Marketing": 1, "Finance": 1, "HR": 1, "Operations": 1, "Support": 1 },
            { "month": "Feb", "Engineering": 3, "Sales": 2, "Marketing": 1, "Finance": 2, "HR": 1, "Operations": 1, "Support": 1 },
            { "month": "Mar", "Engineering": 4, "Sales": 2, "Marketing": 1, "Finance": 2, "HR": 1, "Operations": 1, "Support": 1 },
            { "month": "Apr", "Engineering": 4, "Sales": 2, "Marketing": 2, "Finance": 2, "HR": 1, "Operations": 2, "Support": 2 },
            { "month": "May", "Engineering": 4, "Sales": 3, "Marketing": 2, "Finance": 2, "HR": 2, "Operations": 2, "Support": 2 },
            { "month": "Jun", "Engineering": 5, "Sales": 3, "Marketing": 2, "Finance": 3, "HR": 2, "Operations": 2, "Support": 3 },
            { "month": "Jul", "Engineering": 5, "Sales": 3, "Marketing": 3, "Finance": 3, "HR": 2, "Operations": 2, "Support": 3 }
        ]

    def get_analytics_attendance_trend(self):
        return [
            { "month": "Jan", "present": 88, "absent": 5, "late": 7 },
            { "month": "Feb", "present": 91, "absent": 4, "late": 5 },
            { "month": "Mar", "present": 86, "absent": 7, "late": 7 },
            { "month": "Apr", "present": 89, "absent": 4, "late": 7 },
            { "month": "May", "present": 92, "absent": 3, "late": 5 },
            { "month": "Jun", "present": 87, "absent": 6, "late": 7 },
            { "month": "Jul", "present": 90, "absent": 4, "late": 6 }
        ]

    def get_analytics_performance_distribution(self):
        employees = self.get_employees()
        high = sum(1 for e in employees if e.get("performanceScore", 0) >= 85)
        medium = sum(1 for e in employees if 70 <= e.get("performanceScore", 0) < 85)
        low = sum(1 for e in employees if e.get("performanceScore", 0) < 70)
        return [
            { "name": "High Performers (85+)", "value": high },
            { "name": "Medium Performers (70-84)", "value": medium },
            { "name": "Low Performers (<70)", "value": low }
        ]
