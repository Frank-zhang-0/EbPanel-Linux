export async function getUserFromDb(email: string, password: string) {
  // 在这里添加从数据库获取用户的逻辑
  // 写一个测试用例，以便在没有数据库的情况下测试您的逻辑
  if (email === " " && password === " ") {
    return {
      user: "john@example.com",
    };
  } else {
    return null;
  }
}
