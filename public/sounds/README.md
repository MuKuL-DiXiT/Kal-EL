# Custom Flip Sound

To add a custom paper flip sound effect to the calendar:

1. **Add your audio file** to this directory with the name `flip.mp3`
   - Supported formats: `.mp3`, `.wav`, `.ogg`, `.m4a`
   - Recommended duration: 100-300ms for a quick flip
   - Recommended volume: Keep it around -12dB to -6dB for consistency

2. **Update the file extension** in `CalendarContainer.tsx` if needed:
   - Change `/sounds/flip.mp3` to `/sounds/flip.wav` (or whatever format you use)

3. **The sound will play automatically** whenever you navigate to the next or previous month

Example: Place your `flip.mp3` file in this directory and the calendar will start using it!
