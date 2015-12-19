# localbitcoins filter

This tampermonkey script is designed to add some filtering to localbitcoins site results.

It's a small modification but it has helped me. It does 2 things:

- Sorts results by dollar amounts (click on table header "Price / BTC")
- Hide users that are offline or seen recently

These 2 mods allowed me to easily view the highest/lowest amounts and see those who were ready to do a trade now. localbitcoins is a nice looking site but I'm surprised they didn't add some basic filtering.

# Install

This has only been tested on Chrome but should work on Firefox. To get it working on Chrome you need to install the following extension:

- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

Tampermonkey is an extension which allows people to easily write code that can be ran on a given page. It also has a built in update engine which makes it easy to keep scripts up to date.

# How to use

Attempting to download the javascript file should trigger tampermonkey to detect that it is a tamper monkey script and install it.

Once installed just navigate to localbitcoins.com and view results (or if you have a window open already - you will need to refresh the page for the script to load)

This will add 2 checkboxes below the navigation bar titled "Hide Recent" and "Hide Offline". Checking either will toggle the display of recent/offline. You may also click on "Price / BTC" to sort the list.

# FAQs

Q: How Does this work?  
A: It adds some Javascript onto the page and leverages jQuery for some of the scripting.

Q: Can you steal my account/my BTC in my account?  
A: You have my word (check out my background) that I would NEVER introduce any code to steal accounts or BTC. However, there are bad/stupid/greedy people out there who would create a script that would do that.

Q: Can you add X feature?  
A: I can look into it - post a ticket/bug on github or srchub.

Q: This doesn't work!  
A: See above question.

Q: Can I take this script and modify it/redistribute it?
A: Of course - as long as you follow the license (that's the point of applying a license).

# Donations

If you feel this script was useful please feel free to send BTC to this address - 1kqfr9hYPHTwGdMev9b538sSeyLa5h4FR

# License

This script is licensed under MIT