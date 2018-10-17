export class Item 
{
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) 
    {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

// Returns true if item is conjured
function isConjured(item: Item)
{
    return item.name.substring(0,8) == "Conjured";
}

// Interface meant to update items
interface ItemUpdater
{
    updateItem();
}

class LegendaryUpdater implements ItemUpdater
{
    constructor(private item: Item){}
    updateItem()
    {
        this.item.sellIn -= 1;
    };
}

class NormalUpdater implements ItemUpdater
{
    private qualityMod: number = 1;
    constructor(private item: Item)
    {
        if(isConjured(item))
            this.qualityMod = 2;
        
        if(this.item.sellIn <= 0)
            this.qualityMod *= 2;
        
    }

    updateItem()
    {
        this.item.sellIn -= 1;
        if(this.item.sellIn == 0)
            this.qualityMod *= 2;

        if(this.item.quality > 0)
        {
            this.item.quality = this.item.quality > this.qualityMod ? 
                this.item.quality - this.qualityMod : 0;
        }
    }
}

class AgingUpdater implements ItemUpdater
{
    constructor(private item: Item){}
    updateItem(){
        this.item.sellIn -= 1;

        if(this.item.quality < 50){
            this.item.quality += 1;
        }
    }
}

class EventUpdater implements ItemUpdater
{
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

    updateItem()
    {
        if(this.item.sellIn <= 0)
        {
            this.item.sellIn -= 1;
        }
        else
        {
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
                this.item.quality = (50 - this.item.quality) > this.qualityMod ? 
                    this.item.quality += this.qualityMod : 50;
            }
        }
    }
}

const legendaryItems: Array<String> = ['Sulfuras, Hand of Ragnaros'];
const agingItems: Array<String> = ['Aged Brie'];
const eventItems: Array<String> = ['Backstage passes to a TAFKAL80ETC concert'];

export class GildedRose 
{
    items: Array<Item>;
    ItemUpdaters : Array<ItemUpdater>

    constructor(items = []) 
    {
        this.items = items;

        this.items.forEach(item => 
        {
            if(legendaryItems.indexOf(item.name) > -1)
                this.ItemUpdaters.push(new LegendaryUpdater(item));
            else if(agingItems.indexOf(item.name) > -1)
                this.ItemUpdaters.push(new AgingUpdater(item));
            else if(eventItems.indexOf(item.name) > -1)
                this.ItemUpdaters.push(new EventUpdater(item));
            else
                this.ItemUpdaters.push(new NormalUpdater(item));
        });
    }

    updateQuality() 
    {
        this.ItemUpdaters.forEach(updater => 
        {
            updater.updateItem();
        });

        return this.items;
    }
}
