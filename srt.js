const fs = require("fs");
const RawData = fs.readFileSync("./yourfile.txt","utf-8").split("\n")
/*
讀取檔案內容
 */

/*
全域運算參數
 */

let time = 0
let LastTime = 200

Decode()

async function Decode(){
    let content = ""
    let CalNum = 0
    // console.log(`SimpleSrt:\n 2021/07/19 \n Developer: Miku0139#7414 \n 版權所有,抄襲必究 \n 文字格式: 00:01 內容`)
    for (let i = 0; i <= RawData.length-1 ; i++) {
        let TimeRegex = new RegExp(/^([\w]+):([\w]+) ([\s\S]+)/gm).exec(RawData[i])

        if(TimeRegex) {
           CalNum = i + 1
            if(CalNum > RawData.length-1){
                CalNum = RawData.length-1
            }
            console.log(`[Line ${i}] ${LastTime} ms`)
            let Next = await NextLine(RawData[CalNum]);
            if(Next){
                if(i !== RawData.length -1) {
                    let split = TimeRegex[3].toString().split("\\n")

                    if (split.length > 1) {
                        for (let j = 0; j < split.length; j++) {
                            TimeRegex[3] = split[0] + "\n" + split[j]
                        }
                    }
                    console.log(split[0],split[0].length)

                    content = content + `${i}\n00:${TimeRegex[1]}:${TimeRegex[2]},${LastTime} --> ${Next.text},${Next.time}\n${TimeRegex[3]}\n\n`;

                }else {
                    let fil = `0${parseInt(TimeRegex[2])+1}`
                    if(parseInt(fil) > 10){
                        fil = parseInt(TimeRegex[2])+1
                    }
                    let split = TimeRegex[3].toString().split("\\n")
                    if (split.length > 1) {
                        for (let j = 0; j < split.length; j++) {
                            TimeRegex[3] = split[0] + "\n" +  split[j]
                        }
                    }
                    console.log(split[0],split[0].length)

                    content = content + `${i}\n00:${TimeRegex[1]}:${TimeRegex[2]},${LastTime} --> ${Next.text},${Next.time}\n${TimeRegex[3]}\n\n`;
                    console.log(content)
                }
            }
            //console.log(RawData[i])
        }
    }
    console.log(`已成功運算 ${RawData.length} 行字幕`)
    //console.log(content)
    await fs.writeFileSync("./Output.srt",content,"utf-8")

}

async function NextLine(data){
    let StringDec = new RegExp(/^([\w]+):([\w]+) ([\s\S]+)/gm).exec(data)

    if(StringDec){

        time += 120

        if(time != 0){
            LastTime = time
        }

        if(time < LastTime){
            time = LastTime+100
        }


        if(LastTime > 800){
            LastTime = time + 120
        }

        if(time > 800){
            time = 130
        }



        const result = {
            text: `00:${StringDec[1]}:${StringDec[2]}`,
            time: time
        }

        return result;
    }

}
