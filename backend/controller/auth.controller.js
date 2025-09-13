const Login = require("../models/login.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    let user = new Login({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    user = await user.save();

    if (!user) {
        return res.status(404).send("User cannot be created");
    }

    res.send(user);
};

exports.login = async (req, res) => {
    const user = await Login.findOne({ email: req.body.email });
    const secret = process.env.secret;

    if (!user) {
        return res.status(400).send(`User with email ${req.body.email} is not found`);
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            { expiresIn: "1d" }
        );
        res.status(200).send({ user: user.email, token: token });
    } else {
        res.status(400).send("Password is mismatch");
    }
};

exports.getUsers = async (req, res) => {
    const userList = await Login.find().select("-passwordHash");

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
};

exports.getUserById = async (req, res) => {
    const user = await Login.findById(req.params.id).select("-passwordHash");

    if (!user) {
        res.status(500).json({ success: false, message: "The user with the given ID not exists" });
    }
    res.status(200).send(user);
};
