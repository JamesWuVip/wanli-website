// 测试 zhili-simple-deploy 的表单提交
const testData = {
  name: "测试客户",
  phone: "13800138000",
  projectType: "ai",
  message: "测试咨询表单提交到企业微信",
  locale: "zh-CN"
};

fetch('https://zhili-simple-deploy.vercel.app/api/consultation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response:', data);
})
.catch(error => {
  console.error('Error:', error);
});
