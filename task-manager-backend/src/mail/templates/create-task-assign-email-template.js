const createTaskAssignEmailTemplate = (receiverList, ccList) => {
    const subject = "New Task Assigned to You";
    const content = `Hello ${receiverList[0]},\n\nA new task has been assigned to you. Please check the details in your dashboard.`;
    const html = `
        <html>
            <body>
                <h1>Hello, ${receiverList[0]}!</h1>
                <p>A new task has been assigned to you.</p>
                <p>Please contact ${ccList[0]} if you have any questions.</p>
            </body>
        </html>
    `;
    return { subject, content, html };
};

module.exports = createTaskAssignEmailTemplate;
