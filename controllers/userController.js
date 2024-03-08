import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";

const signOn = async (req, res) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email })

    if (userExist) {
        const error = new Error('User already registered')
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Create new user
        const user = new User(req.body);
        const userSaved = await user.save();
        res.json(userSaved);
    } catch (error) {
        console.error(error);
    }
};

const profile = (req, res) => {
    const { user } = req;
    res.json({ user });
};

const confirm = async (req, res) => {
    const { token } = req.params
    const userConfirm = await User.findOne({ token })

    if (!userConfirm) {
        const error = new Error('Token not valid');
        return res.status(404).json({ msg: error.message });
    }

    try {
        userConfirm.token = null;
        userConfirm.verifiedAccount = true;
        await userConfirm.save();
        res.json({ msg: "User confirmed" })
    } catch (error) {
        console.log(error);
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists.
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("User does not exist")
        return res.status(404).json({ msg: error.message })
    }

    // Check if user is confirmed or not.
    if (!user.verifiedAccount) {
        const error = new Error("User is not verified")
        return res.status(403).json({ msg: error.message })
    }

    // Check password
    if (await user.checkPassword(password)) {
        // Authenticate user.
        res.json({ token: generateJWT(user.id) })
    } else {
        const error = new Error("Incorrect password")
        return res.status(403).json({ msg: error.message })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const emailExist = await User.findOne({ email })
    if (!emailExist) {
        const error = new Error('User does not exist')
        return res.status(400).json({ msg: error.message })
    }

    try {
        emailExist.token = generateId()
        await emailExist.save();
        res.json({ msg: "We have sent you an email with instructions to change your password" })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await User.findOne({ token })

    if (validToken) {
        res.json({ msg: "Valid token, user exists" })
    } else {
        const error = new Error('Invalid token');
        return res.status(404).json({ msg: error.message })
    }

}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error('An error has ocurred')
        return res.status(400).json({ msg: error.message })
    }

    try {
        user.token = null;
        user.password = password;

        await user.save();
        res.json({ msg: "Password modified correctly" })
    } catch (error) {
        console.log(error)
    }
}

export {
    signOn,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword
};