const ID3Writer = require("browser-id3-writer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const URI = "https://firebasestorage.googleapis.com/v0/b/lacueva-licores.appspot.com/o/fly_sound-davidlopez.mp3?alt=media&token=1a56581c-1cfe-4f48-9482-263156397aad";
const coverBuffer = fs.readFileSync(path.resolve(__dirname,'code.jpg'));


(async () => {
  try {
    let { data } = await axios.get(URI, {
      responseType: 'arraybuffer'
    });
    
    // const songBuffer = fs.readFileSync(path.resolve(__dirname, "entry/local/fly_sound-davidlopez.mp3"));
    let writer = new ID3Writer(data);
    
    writer
      .setFrame("TIT2", "Descargado 1")
      .setFrame("TPE1", ["EndersonPro", "Eminem", "50 Cent"])
      .setFrame("TALB", "Friday Night Lights")
      .setFrame("TYER", 2004)
      .setFrame("TRCK", "6/8")
      .setFrame("TCON", ["Soundtrack"])
      .setFrame("TBPM", 128)
      .setFrame("WPAY", "https://google.com")
      .setFrame("TKEY", "Fbm")
      .setFrame('APIC', {
        type: 3,
        data: coverBuffer,
        description: 'Super picture'
      });
    writer.addTag();
    const taggedSongBuffer = Buffer.from(writer.arrayBuffer);
    fs.writeFileSync(path.resolve(__dirname, "output/download/fly_sound-davidlopez.mp3"),taggedSongBuffer);
  } catch (e) {
    console.log(e);
  }
})();
