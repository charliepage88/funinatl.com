<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>FunInATL Prototype</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
  </head>
  <body class="min-h-screen font-sans antialiased">
    @inertia
    <x-main>
      <div id="app">
        <x-slot:content>{{ $slot }}</x-slot:content>
      </div>

      <!-- Footer area -->
        <x-slot:footer>
            <hr />
            <div class="p-6">
                Footer
            </div>
        </x-slot:footer>
    </x-main>
  </body>
</html>
