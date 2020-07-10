chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({url: 'https://soundcloud.com/*'}, function(tabs) {
    var selector = '';

    for (let tab of tabs) {
      if (tab.url.startsWith('https://soundcloud.com')) {
        switch (command) {
          case 'play-pause':
            selector = '.playControls__play';
            break;
          case 'next':
            selector = '.skipControl__next';
            break;
          case 'previous':
            selector = '.skipControl__previous';
            break;
          case 'like':
            selector = '.playbackSoundBadge__like[aria-label=Like]';
            break;
          case 'unlike':
            selector = '.playbackSoundBadge__like[aria-label=Unlike]';
            break;
        }
      }

      if (selector.length) {
        var script = "document.querySelectorAll('" + selector + "').forEach(function(item){item.click()})";
        chrome.tabs.executeScript(tab.id, {code: script});
        break;
      }
    }
    
  });
});