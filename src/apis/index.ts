


export function getUserCollege() {
 return fetch('/gateway/admin/useRecord/list', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLmm7nmlofpuY8iLCJ1c2VyX2luZm8iOiJhZG1pbjo1MDAwMDA0Njc6MTcwMzIwOTA3MDg4NSIsImlzX3Rva2VuX2NhY2hlZCI6dHJ1ZSwiZXhwIjoxNzAzMjUyMjcwfQ.xLEoEzmq-1X6ssF8hwtsmhd8iFxpNAUi4yZeRUAFS1izxsLnX_tqjz15fu-co5SETjs5Nwwl82f60Cm_l1IKCw'
    }
  }).then(res => res.json())
}