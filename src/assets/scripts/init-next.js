const { spawn } = require('child_process');

const scriptPath = './src/assets/scripts/init-next.ps1';

// Spawn a new PowerShell process
const ps = spawn('powershell.exe', ['-File', scriptPath]);

// Capture stdout data
ps.stdout.on('data', (data) => {
  
});

// Capture stderr data
ps.stderr.on('data', (data) => {
  
});

// Handle process exit
ps.on('close', (code) => {
  
});