const con = require('./connect');
const bcrypt = require('bcryptjs');

require('dotenv').config();

async function createAdminUser() {
    try {
        const user = {
            user_id: 1,
            firstname: 'Admin',
            lastname: 'Admin',
            email: 'info@ksarooyghem.be',
            is_admin: 1,
            username: 'admin',
            passhash: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 11),
            phone: '000',
            bondsteam: "/",
            group_id: 1
        }
        await con.query('INSERT INTO users SET ?', user, (err, user)=>{
            if(err) return console.log(err);
            console.log('Succeded');
        });
    } catch (error) {
        console.log(error);
    }
}

createAdminUser();