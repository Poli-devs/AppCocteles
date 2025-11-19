import { exec } from "child_process";

exec("open http://localhost:3000"); // MacOS abre automáticamente

exec("next dev -p 3000", (err, stdout, stderr) => {
    if (err) console.error(err);
    console.log(stdout);
});
