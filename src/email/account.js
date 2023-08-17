const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createAccount = (email,name) => {
sgMail.send({
to:email,
from:'mahmoud0122549@gmail.com',
subject:"Thanks for joining task app",
text:`Welcome to task app, ${name}. You can write your notes and todo list here`
})

}

const deleteAccount = (email,name) => {

sgMail.send({
to:email,
from:'mahmoud0122549@gmail.com',
subject:"Sorry to see you go",
text:`Goodbye, ${name}. we hope to see you soon`
})
}


module.exports = {createAccount,deleteAccount}
