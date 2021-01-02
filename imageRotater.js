function CreateImgData(imgSource) {
    return {
        img: imgSource,
        angle: 0,
        isFixed: true,
        fix: function() {
            if (this.angle % 180 == 0) {
                var p_height = this.img.height / window.innerHeight;
                var p_width = this.img.width / window.innerWidth;
                if (p_height > p_width) {
                    this.img.width = this.img.width * window.innerHeight / this.img.height;
                    this.img.height = window.innerHeight;
                } else {
                    this.img.height = this.img.height * window.innerWidth / this.img.width;
                    this.img.width = window.innerWidth;
                }
            } else {
                var p_height = this.img.width / window.innerHeight;
                var p_width = this.img.height / window.innerWidth;
                if (p_height > p_width) {
                    this.img.height = this.img.height * window.innerHeight / this.img.width;
                    this.img.width = window.innerHeight;
                } else {
                    this.img.width = this.img.width * window.innerWidth / this.img.height;
                    this.img.height = window.innerWidth;
                }
            }
            this.isFixed = true;
        },
        actualize: function() {
            this.img.width = this.img.naturalWidth;
            this.img.height = this.img.naturalHeight;
            var p_width;
            var p_height;
            if (this.angle % 180 == 0) {
                p_height = this.img.height / window.innerHeight;
                p_width = this.img.width / window.innerWidth;
            } else {
                p_height = this.img.width / window.innerHeight;
                p_width = this.img.height / window.innerWidth;
            }
            this.isFixed = !(p_width > 1 || p_height > 1);
        },
        rotate: function(dentaAngle) {
            this.angle = (this.angle + dentaAngle) % 360;
            this.img.style.transform = "rotateZ(" + this.angle + "deg)";
            if (this.isFixed) {
                if (this.angle % 180 == 0) {
                    p_height = this.img.height / window.innerHeight;
                    p_width = this.img.width / window.innerWidth;
                    if(p_height > p_width){
                        if(p_height > 1){
                            this.img.width = this.img.width * window.innerHeight / this.img.height;
                            this.img.height = window.innerHeight;
                        }
                    } 
                    else{
                        if(p_width > 1){
                            this.img.height = this.img.height * window.innerWidth / this.img.width;
                            this.img.width = window.innerWidth;
                        }
                    }
                } else {
                    p_height = this.img.width / window.innerHeight;
                    p_width = this.img.height / window.innerWidth;
                    if(p_height > p_width){
                        if(p_height > 1){
                            this.img.height = this.img.height * window.innerHeight / this.img.width;
                            this.img.width = window.innerHeight;
                        }
                    } 
                    else{
                        if(p_width > 1){
                            this.img.width = this.img.width * window.innerWidth / this.img.height;
                            this.img.height = window.innerWidth;
                        }
                    }
                }
            }
        }
    };
}
function CreateControlButton(/* id,  */fillColor, svgPath, func){
    var a = document.createElement("a");
    //a.id = id;
    a.style.fill = fillColor;
    a.addEventListener("click",func);
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox","0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d",svgPath);
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path1.setAttribute("d","M0 0h24v24H0z");
    path1.style.fill = "none";
    svg.appendChild(path);
    svg.appendChild(path1);
    a.appendChild(svg);
    return a;
}
function BuildTemplate(imgData){
    var jsImgBar = document.createElement("div");
    jsImgBar.id = "js-img-bar";
    jsImgBar.appendChild(CreateControlButton("#00c287","M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z",function(){
        imgData.rotate(270);
    }));
    jsImgBar.appendChild(CreateControlButton("#d52a2a","M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z",function(){
        imgData.rotate(180);
    }));
    jsImgBar.appendChild(CreateControlButton("#03A9F4","M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z",function(){
        imgData.rotate(90);
    }));
    jsImgBar.appendChild(CreateControlButton("#03A9F4","M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z",function(){
        imgData.actualize();
    }));
    jsImgBar.appendChild(CreateControlButton("#00c287","M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z",function(){
        imgData.fix();
    }));
    var hoverToAppear = document.createElement("div");
    hoverToAppear.id = "hover-to-appear";
    hoverToAppear.appendChild(jsImgBar);
    document.getElementsByTagName("body")[0].appendChild(hoverToAppear);
    //return jsImgBar;
}
var imgArray = document.querySelectorAll("body>img");
if (imgArray.length == 1) {
    imgArray[0].style.cursor = 'default';
    var imgData = CreateImgData(imgArray[0]);
    BuildTemplate(imgData);
    //Image Resize
    imgArray[0].style.cursor = "default";
    //End
}