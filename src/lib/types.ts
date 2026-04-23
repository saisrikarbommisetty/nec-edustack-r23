export interface Material {
  id: string;
  branch: string;
  semester: string;
  subject: string;
  unit: string;
  type: "Notes" | "PPT" | "PYQ";
  pdfUrl: string;
  tags: string[];
  createdAt: Date;
}

export interface Syllabus {
  id: string;
  branch: string;
  semester: string;
  subject: string;
  syllabusUrl: string;
}

export const YEARS = [
  { year: 1, label: "1st Year", semesters: ["Sem1", "Sem2"], color: "from-blue-500 to-cyan-500" },
  { year: 2, label: "2nd Year", semesters: ["Sem3", "Sem4"], color: "from-violet-500 to-purple-500" },
  { year: 3, label: "3rd Year", semesters: ["Sem5", "Sem6"], color: "from-amber-500 to-orange-500" },
  { year: 4, label: "4th Year", semesters: ["Sem7", "Sem8"], color: "from-emerald-500 to-teal-500" },
];

export const BRANCHES = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"];

export const UNITS = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];

export const MATERIAL_TYPES: Material["type"][] = ["Notes", "PPT", "PYQ"];

export const TAGS = ["Important", "Exam", "Quick Revision"];

// Subjects per branch/semester
export const SUBJECTS: Record<string, Record<string, string[]>> = {
  CSE: {
    Sem1: ["Mathematics-I", "Physics", "English", "Programming in C", "Engineering Drawing"],
    Sem2: ["Mathematics-II", "Chemistry", "Environmental Science", "Data Structures", "Digital Logic"],
    Sem3: ["Mathematics-III", "DBMS", "Computer Organization", "OOP with Java", "Discrete Mathematics"],
    Sem4: ["Operating Systems", "Computer Networks", "Software Engineering", "DAA", "Probability & Statistics"],
    Sem5: ["Data Warehousing & Data Mining", "Computer Networks", "Formal Languages & Automata Theory", "Mobile Computing", "Object Oriented Analysis & Design"],
    Sem6: ["Cryptography & Network Security", "Cloud Computing", "Machine Learning", "Compiler Design", "Software Project Management", "Introduction to Embedded Systems"],
    Sem7: ["Deep Learning", "Blockchain", "NLP", "Elective-III", "Project-I"],
    Sem8: ["Elective-IV", "Elective-V", "Project-II", "Internship"],
  },
  ECE: {
    Sem1: ["Mathematics-I", "Physics", "English", "Basic Electronics", "Engineering Drawing"],
    Sem2: ["Mathematics-II", "Chemistry", "Environmental Science", "Circuit Analysis", "Digital Logic"],
    Sem3: ["Signals & Systems", "Electronic Devices", "Network Theory", "Mathematics-III", "Electromagnetic Theory"],
    Sem4: ["Analog Communications", "Control Systems", "Microprocessors", "VLSI Design", "Probability & Statistics"],
    Sem5: ["Digital Communications", "DSP", "Antenna & Wave Propagation", "Embedded Systems", "Elective-I"],
    Sem6: ["Wireless Communications", "Radar Engineering", "Optical Communications", "IoT", "Elective-II"],
    Sem7: ["Satellite Communications", "Elective-III", "Elective-IV", "Project-I", "Seminar"],
    Sem8: ["Elective-V", "Project-II", "Internship"],
  },
};

// Fill remaining branches with generic subjects
BRANCHES.forEach(branch => {
  if (!SUBJECTS[branch]) {
    SUBJECTS[branch] = {};
    for (let s = 1; s <= 8; s++) {
      SUBJECTS[branch][`Sem${s}`] = [
        `${branch} Subject 1`,
        `${branch} Subject 2`,
        `${branch} Subject 3`,
        `${branch} Subject 4`,
        `${branch} Subject 5`,
      ];
    }
  }
});
