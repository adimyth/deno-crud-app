import fs from "fs";
import data from "./books.json" assert { type: "json" };

// Original file taken from https://github.com/benoitvallon/100-best-books/blob/master/books.json
console.log(data.length);
data.forEach(book => {
    book["slug"] = book.title.toLowerCase().replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')    
});

console.log(data);
fs.writeFile("resources/books.json", JSON.stringify(data, null, 4), "utf8", function(err){if(err) console.log(err)});
