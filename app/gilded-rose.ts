export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}


function isConjured(item: Item){
    return item.name.substring(0,8) == "Conjured";
}

interface ItemTracker{
    updateQuality();
}

class LegendaryTracker implements ItemTracker{
    updateQuality(){};
}

class NormalTracker implements ItemTracker{
    private qualityMod: number = 1;
    constructor(private item: Item)
    {
        if(isConjured(item))
            this.qualityMod = 2;
        
        if(this.item.sellIn == 0)
            this.qualityMod *= 2;
        
    }

    updateQuality(){
        this.item.sellIn -= 1;
        if(this.item.sellIn == 0)
            this.qualityMod *= 2;

        if(this.item.quality > 0){
            this.item.quality = this.item.quality >= this.qualityMod ? 
                this.item.quality - this.qualityMod : 0;
        }
    }
}

class AgingTracker implements ItemTracker{
    constructor(private item: Item){}

    updateQuality(){
        this.item.sellIn -= 1;

        if(this.item.quality < 50){
            this.item.quality += 1;
        }
    }
}

class EventTracker implements ItemTracker{
    private qualityMod: number = 1;
    constructor(private item: Item)
    {
        if(this.item.sellIn <= 0)
            this.item.quality = 0;
        else if(this.item.sellIn <= 5)
            this.qualityMod = 3;
        else if(this.item.sellIn <= 10)
            this.qualityMod = 2;
        
    }

    updateQuality(){
        if(this.item.sellIn <= 0){
            this.item.sellIn -= 1;
            return;
        }
        else{
            this.item.sellIn -= 1;

            if(this.item.sellIn == 10)
                this.qualityMod = 2;
            else if (this.item.sellIn == 5)
                this.qualityMod = 3;
            else if(this.item.sellIn == 0){
                this.item.quality = 0;
                return;
            }

            if(this.item.quality > 0){
                this.item.quality = 50 - this.item.quality >= this.qualityMod ? 
                    this.item.quality += this.qualityMod : 50;
            }
        }
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            // OLD CODE
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }

            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }

            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
