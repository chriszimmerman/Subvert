function convertToMilliseconds(stringTime) {

    var millisecondsPerHour = 3600000;
    var millisecondsPerMinute = 60000;

    var hoursMinutesSecondsMilliseconds = stringTime.split(":");

    var hoursInMilliseconds = new Number(hoursMinutesSecondsMilliseconds[0]) * millisecondsPerHour;
    var minutesInMilliseconds = new Number(hoursMinutesSecondsMilliseconds[1]) * millisecondsPerMinute;

    var secondsAndMilliseconds = new Number(hoursMinutesSecondsMilliseconds[2].replace(',', ''));

    return (hoursInMilliseconds + minutesInMilliseconds + secondsAndMilliseconds);
};

function getTimesFromLine(line) {
	var startAndEndTime = line.split("-->");
    return {startTime: startAndEndTime[0].trim(), endTime: startAndEndTime[1].trim()};
};

function getTextFromFile(files) {
    var file = files[0];
	var fileReader = new FileReader();

    var fileText = "";
    fileReader.onload = function(event) {
        convertSrtEntryToSmi(event.target.result);
    };

	fileReader.readAsText(file);
};

function convertSrtEntryToSmi(filetext) {
    var srtFile = "";
    var lines = filetext.split('\n');
    var nextEntry = 1;

    for(var i = 0; i < lines.length; i++) {

        if(parseInt(lines[i]) === nextEntry) {
            nextEntry++;
        }
        else if(lines[i].indexOf("-->") !== -1) {
            var time = convertToMilliseconds(getTimesFromLine(lines[i]).startTime);
            srtFile = srtFile + "<SYNC Start=" + time + "><P>\n"; 
        }
        else if(lines[i] === ""){
            srtFile = srtFile + "&nbsp;";   
        }
        else
            srtFile = srtFile + lines[i] + '\n';
    }
    return srtFile;
};