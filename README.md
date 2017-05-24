# mailshine
A simple and lightweight library that cleans html email content for use in other environments like webpages.

Email clients will often populate emails with style and class tags in the HTML they send. In addition, email clients will quote the entire previous email chain with each reply. While all these techniques work for traditional email, they cause headaches for email integration into other apps.

This library solves this problem.

## Overview

Mailshine uses regex patterns to detect the beginning of the quoted part of an email. All content at and after that point is removed.

There is no common format for quoted email replies. Email clients often devise their own way of indicated quoted content. Mailshine includes regex patterns that capture the email replies of the following email clients:

* Apple iPhone
* Gmail
* Apple iPad
* Google Android
* Apple Mail Web client
* Outlook
* Yahoo
* Outlook web client
* Thunderbird

This list covers more than 90% of email clients in use. It may be safe to assume that the coverage is a few % higher because less used clients likely use some of the same patterns to indicate email replies. [Source](https://litmus.com/blog/the-top-10-most-popular-email-clients-of-2016)

If you find an email client that uses a reply format that is not picked up by the included regex patterns, you can add your own custom regex patterns. In addition, if you find that one of the current patterns is incorrectly parsing or causing unwanted side effects, you can remove specific regex patterns if wanted. For usage, view the Usage section below.

If their is broader applications to the addition or subtraction of a regex pattern, please open an issue.

## Setup

At the moment Mailshine is only available on Node. A browser compatible version is coming soon.

Install via console:  `npm install mailshine`

## Usage

```javascript
var Mailshine = require('mailshine'),
    mailshine,
    output,
    html;

html = "<p>Hi Warren! Tennis this weekend?</p><div>To: mikejonesab12@gmail, From: Warren Buffet</div><p>Hey, it's your pal Warren :)</p>";

//Instantiate. Add and remove patterns.
mailshine = new Mailshine({
    add:[/reply:/g],
    remove:[/\\>.*?[\s]\>/g]
});

//Tip: console.log(mailshine.replyDetectors) to see what patterns will be used.

output = mailshine.parseHTML(html);

//Output:
{
    htmlContent: "<p>Hi Warren! Tennis this weekend?</p>",
    htmlQuote: "<div>To: mikejonesab12@gmail, From: Warren Buffet</div><p>Hey, it's your pal Warren :)</p>",
    markdownContent: "Hi Warren! Tennis this weekend?",
    markdownContent: "To: mikejonesab12@gmail, From: Warren Buffet\n\nHey, it's your pal Warren :)"
}

```
## About
Version 1.0.3
Last Updated 5/7/2017
