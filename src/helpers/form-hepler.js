export function validateUserName(rule, value, callback) {
  const regex = '^[a-zA-Z0-9_]*$';
  if (!value.match(regex)) {
    callback(new Error('Username only support alphanumeric and underscores'));
  } else {
    callback();
  }
}
