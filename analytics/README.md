# analytics

This project runs the boilerplate that sets up Google Analytics for directactioneverywhere.com.

# build

To build, run "npm run build". It builds the analytics tracking with
rollup, and builds a custom version of autotrack with only
outboundLinkTracker and cleanUrlTracker.

NOTE: You need node 6 to build autotrack.

After you've built both, make sure you commit `out` to the git repo,
because `out` gets served by nginx on our site.

# use

Use the package like this:

```
<html>
  <head>
    <script>
      // Track errors
      addEventListener('error', window.__e=function f(e){f.q=f.q||[];f.q.push(e)});</script>
      // Set up the ga object
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};
    </script>

    <!-- Download google analytics and our custom autotrack build asynchronously -->
    <script async src='https://www.google-analytics.com/analytics.js'></script>
    <script async src="https://static.dxetech.org/analytics/out/autotrack.js"></script>

  </head>
  <body>
    ...

    <!-- Run the analytics setup code at end of body. -->
    <script src="https://static.dxetech.org/analytics/out/analytics.js"></script>
  </body>
</html>
```
