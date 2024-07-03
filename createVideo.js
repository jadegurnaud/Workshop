import Editly from 'editly'
import fs from 'fs'
import ffmpegPath from 'ffmpeg-static'
import ffprobePath from 'ffprobe-static'
ffmpegPath.replace('app.asar', 'app.asar.unpacked')
ffprobePath.path.replace('app.asar', 'app.asar.unpacked')

const images = fs.readdirSync('./downloaded_files');
let imageList = [];

for (let index = 0; index < images.length; index++) {
    const element = images[index];
    imageList.push(`./downloaded_files/${element}`);
}

const clips = imageList.map(image => {
    return { duration: 5, layers: [{ type: 'image', path: image }] };
});

export async function createVideo() {
    try {
        await Editly({
            width: 1920,
            height: 1080,
            outPath: 'output.mp4',
            defaults: {
                transition: {
                    duration: 0.2,
                    name: 'GlitchMemories',
                }
            },
            clips: clips,
            audioFilePath: './music/sound1.mp3',
            fps: 30,
            ffmpegPath,
            ffprobePath
        });
        console.log('Video created successfully!');
    } catch (error) {
        console.error('Error creating video:', error);
    }
}