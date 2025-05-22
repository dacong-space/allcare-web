/*=============== EMAIL CONFIGURATION ===============*/
// EmailJS 配置文件
// 请在 EmailJS 控制台获取以下信息并替换相应的值

const EMAIL_CONFIG = {
    // 从 EmailJS Account 页面获取
    PUBLIC_KEY: "IzSsLLoWZE_3XvtII",

    // 从 EmailJS Services 页面获取
    SERVICE_ID: "service_69j62s4",

    // 从 EmailJS Email Templates 页面获取
    TEMPLATE_ID: "template_r2qn8qp",

    // 可选：自定义配置
    SETTINGS: {
        // 成功消息显示时间（毫秒）
        SUCCESS_TIMEOUT: 5000,

        // 错误消息显示时间（毫秒）
        ERROR_TIMEOUT: 7000,

        // 是否在控制台显示调试信息
        DEBUG: false
    }
};

// 邮件模板变量说明
const TEMPLATE_VARIABLES = {
    user_email: "发送者的邮箱地址",
    subject: "邮件主题",
    message: "邮件内容",
    // 如果需要更多字段，可以在这里添加
    // user_name: "发送者姓名",
    // phone: "电话号码",
    // company: "公司名称"
};

// 推荐的邮件模板内容
const RECOMMENDED_TEMPLATE = `
Subject: New Contact Form Message - {{subject}}

Hello,

You have received a new message from your website contact form:

From: {{user_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your website contact form.
Time: {{current_time}}
`;

// 导出配置（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
}

// 配置验证（仅在开发模式下显示）
if (EMAIL_CONFIG.SETTINGS.DEBUG) {
    console.log('EmailJS 配置已加载');
}
