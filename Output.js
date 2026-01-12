const modifier = (text) => {
    let processedText = text.trim();

    function subModify() {
        if (processedText[0] !== " ") {
            processedText = ` ${processedText}`;
        }
    }

    // Preserving quote positions
    const quoteIndexes = [];
    for (let i = 0; i < processedText.length; i++) {
        if (processedText[i] === `"`) {
            quoteIndexes.push(i);
        }
    }

    // If there is at least one complete pair of quotation marks
    if (quoteIndexes.length >= 2 && quoteIndexes.length % 2 === 0) {
        // const lastOpenQuote = quoteIndexes[quoteIndexes.length - 2];
        const lastCloseQuote = quoteIndexes[quoteIndexes.length - 1];

        // Text AFTER the closing quotation mark
        const afterQuote = processedText.slice(lastCloseQuote + 1).trim();

        // If there is an unfinished tail after the speech, we cut it off.
        if (afterQuote && !/[.!?]$/.test(afterQuote)) {
            processedText = processedText.slice(0, lastCloseQuote + 1);
        }

        // Check the character before the closing quote
        const beforeQuote = processedText[lastCloseQuote - 1];

        if (beforeQuote === ",") {
            processedText =
                processedText.slice(0, lastCloseQuote - 1) + `."`;
        } else if (!/[.!?]/.test(beforeQuote)) {
            processedText =
                processedText.slice(0, lastCloseQuote) + `."`;
        }

        subModify();
        return { text: processedText };
    }

    // Standard logic for an unfinished sentence without quotes
    if (!processedText.match(/[.!?]\s*$/)) {
        const match = processedText.match(/([.!?])[^.!?]*$/);

        if (match) {
            processedText = processedText.slice(0, match.index + 1);
        } else {
            processedText = "";
        }
    }

    subModify();
    return { text: processedText };
};

modifier(text);
