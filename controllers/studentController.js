import Student from '../models/student.js';

export async function getStudents(req, res) {

    try {
        
        const studentList = await Student.find()

        res.json({
            list: studentList 
   
    })
    
    } catch (error) {
        res.json({
            message:error
        })
    }

    // Student.find()
    //     .then((studentList) => {
    //         res.status(200).json({
    //             list: studentList,
    //         });
    //     })
        // .catch(() => {
        //     res.status(500).json({
        //         message: "Students not found",
        //     });
        // });
}

export function createStudent(req, res) {
    const newStudent = new Student(req.body); 

    newStudent.save()
        .then(() => {
            res.status(200).json({
                message: "Student saved successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Student save failed",
                error: error.message,
            });
        });
}

export function deleteStudent(req, res) {
    Student.deleteOne({ name: req.body.name })
        .then(() => {
            res.json({
                message: "Student deleted successfully",
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Student deletion failed",
            });
        });
}
