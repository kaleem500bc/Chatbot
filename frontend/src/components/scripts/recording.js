import { init_media_recorder } from "./helperfunc";

const media_recorder = await init_media_recorder();

async function Recording (event){
        const btn = event.target;

        if (btn.innerHTML === "Stop...")
        {
            await media_recorder.stop();
            btn.innerHTML = "Rec";
        }
        else
        {
            // start recording
            media_recorder.start();
            btn.innerHTML = "Stop...";
        }
}
export {Recording};