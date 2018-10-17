# GildedRose-Refactoring-Kata

This refactor creates different "updaters" for each kind of item that take care of the items updates. The advantage of this approach is that we only check for the kind of item once on the creation of the updater and then the updater does the minimum required checks each loop. This reduces the ammount of checks per item and loop from 6-13 per item to 0-4 per item.

So lets say we have 100 items, with the old code each loop would do between 600 and 1300 checks per loop and with the new code it would do between 0 to 400 checks. And this does not have into account the operations done into each check.
