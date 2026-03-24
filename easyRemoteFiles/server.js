const { execSync } = require('child_process');

let returnCode;
try {
  execSync('tailscale whois abc', { stdio: 'inherit' });
  returnCode = 0;
} catch (e) {
  returnCode = e.status;
}

#!/bin/bash
tailscale whoami ${0}
console.log('Return code:', returnCode);
