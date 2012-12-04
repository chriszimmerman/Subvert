describe("converts a string time into a numeric milliseconds value", function() {
    it("converts the milliseconds in the string into a number", function() {
       var stringTime = "00:00:00,345";
       var milliseconds = 345;
       
       expect(convertToMilliseconds(stringTime)).toEqual(milliseconds);
    });
 
    it("converts seconds and milliseconds into a number", function() {
       var stringTime = "00:00:15,012";
       var milliseconds = 15012;
       
       expect(convertToMilliseconds(stringTime)).toEqual(milliseconds); 
    });
    
    it("converts minutes, seconds, and milliseconds into a number", function() {
       var stringTime = "00:15:05,100";
       var milliseconds = 905100;
       
       expect(convertToMilliseconds(stringTime)).toEqual(milliseconds); 
    });
    
    it("converts hours, minutes, seconds, and milliseconds into a number", function() {
       var stringTime = "10:15:05,100";
       var milliseconds = 36905100;
       
       expect(convertToMilliseconds(stringTime)).toEqual(milliseconds); 
    });
});

describe("Reads a line with subtitle times on it and extracts the times", function() {
  it("has a starting time and an ending time", function() {
    var lineOfFile = "00:10:06,123 --> 00:10:25,543";
    var startTimeMilliseconds = "00:10:06,123";
    var endTimeMilliseconds = "00:10:25,543";

    var timeLine = {startTime: startTimeMilliseconds, endTime: endTimeMilliseconds};

    var result = getTimesFromLine(lineOfFile);

    expect(result.startTime).toEqual(timeLine.startTime);
    expect(result.endTime).toEqual(timeLine.endTime);
  });
});

describe("Parse and translate srt to smi", function() {
  it("parses an srt entry from the file text and converts it to an smi entry", function() {
    var srtText = "1\n00:00:07,916 --> 00:00:12,339\nEpisode 7\nWhat's wrong with hating family get-together?!";
    var smiText = "<SYNC Start=7916><P>\nEpisode 7\nWhat's wrong with hating family get-together?!\n";
    var textThatGetsParsed = convertSrtEntrytoSmi(srtText);

    expect(textThatGetsParsed).toEqual(smiText);
  });
});
