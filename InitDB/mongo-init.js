db.createUser(
    {
        user: "usrReact",
        pwd: "123456",
        roles: [
            {
                role: "readWrite",
                db: "reactbk"
            }
        ]
    }
);