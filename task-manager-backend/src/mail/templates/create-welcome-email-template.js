const createWelcomeEmailTemplate = (receiverList) => {
    const subject = "Welcome to Our Service!";
    const content = `Hello ${receiverList[0]},\n\nWelcome to our platform! We are thrilled to have you on board.`;
    const html = `
        <html>
            <body>
                <h1>Welcome, ${receiverList[0]}!</h1>
                <p>We are excited to have you join us. Let us know if you need any help getting started.</p>
            </body>
        </html>
    `;
    return { subject, content, html };
};

module.exports = createWelcomeEmailTemplate;
