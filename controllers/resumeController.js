import Resume from "../models/Resume";

export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({ userId, title })
        return res.status(201).json({ success: true, message: 'Resume created.', resume: newResume })


    } catch (error) {
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const deleteResume = await Resume.findOneAndDelete({ userId, _id: resumeId })
        return res.status(200).json({ success: true, message: 'Resume deleted.' })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;

        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found." })
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ success: true, data: resume })

    } catch (error) {
        console.error(" -> ", error);
        return res.status(500).json({ success: false, message: 'Oops! something went wrong.' })
    }
}