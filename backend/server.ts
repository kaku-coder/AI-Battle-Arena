import app from "./src/app.js";
import { connectDatabase } from "./src/config/congi.js";



const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDatabase();
});

