</br>
<div align="center">
  <img src="https://raw.githubusercontent.com/cer10ty/hncode/master/public/images/HNCode.png" alt="HNCode Logo" height="250px" width="250px"></img>
</div>
</br>

# HNCode²

HNCode² is the successor to [HNCode](https://github.com/CER10TY/hncode), an extension no longer being developed. The idea behind HNCode was to provide a custom webview inside VSCode to browse Hacker News, eventually adding a code style view. However, due to the extreme simplicity of Hacker News itself, it made sense to instead provide it as a Tree View, for more discreet browsing in VSCode. This is HNCode². 

## Features

* Browse Top, New, Ask and Show HN in a tree view.
* Go straight to external URLs or self posts from the tree view.
* Expand the items to reveal amount of comments.
* Click on expanded items to go straight to the comments in Hacker News.

## Requirements

This extension requires Visual Studio Code 1.38.0 or later to work properly.

## Extension Settings

This extension contributes the following settings:

* `hncode2.limitation`: Set the amount of items to be loaded on the front page.

## Known Issues

* It looks ugly.
* Comments are not being pulled yet.
* Active tabs (ie. Ask HN) are not being greyed out yet.

## Release Notes

### 0.1.0

* NEW: Marketplace Icon added.

### 0.0.9

* CHANGED: HNCode² is now named Hacker News for VSCode to increase visibility in Marketplace.

### 0.0.8

* NEW: The amount of comments is now shown when expanding a story in tree view.
* NEW: A link to comment section has been provided when clicking on "x comments".
* FIXES: Various.

### 0.0.5

* NEW: Browse Ask, Top, Show and New HN through Context Actions.
* NEW: Go straight to external URL when clicking on story, including Ask and Show HN.
* IN PROGRESS: Show link to comments when expanding a story.
* FIXED: Bad URL when clicking on HN self posts.
* FIXED: No longer show post ID next to post.
* IN PROGRESS: Display 1 to n numbers next to entries.

### 0.0.1

Pre-alpha Release
