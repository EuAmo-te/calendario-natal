function createFlowerContent(container) {
    // Create the exact structure from Flower-main/index.html
    
    // Night background
    const night = document.createElement('div');
    night.className = 'night';
    container.appendChild(night);

    // Flowers Container
    const flowers = document.createElement('div');
    flowers.className = 'flowers';
    container.appendChild(flowers);

    // Flower 1
    const flower1 = document.createElement('div');
    flower1.className = 'flower flower--1';
    flowers.appendChild(flower1);

    const leafs1 = document.createElement('div');
    leafs1.className = 'flower__leafs flower__leafs--1';
    flower1.appendChild(leafs1);

    for(let i=1; i<=4; i++) {
        const l = document.createElement('div');
        l.className = `flower__leaf flower__leaf--${i}`;
        leafs1.appendChild(l);
    }

    const circle1 = document.createElement('div');
    circle1.className = 'flower__white-circle';
    leafs1.appendChild(circle1);

    for(let i=1; i<=8; i++) {
        const l = document.createElement('div');
        l.className = `flower__light flower__light--${i}`;
        leafs1.appendChild(l);
    }

    const line1 = document.createElement('div');
    line1.className = 'flower__line';
    flower1.appendChild(line1);

    for(let i=1; i<=6; i++) {
        const l = document.createElement('div');
        l.className = `flower__line__leaf flower__line__leaf--${i}`;
        line1.appendChild(l);
    }

    // Flower 2
    const flower2 = document.createElement('div');
    flower2.className = 'flower flower--2';
    flowers.appendChild(flower2);

    const leafs2 = document.createElement('div');
    leafs2.className = 'flower__leafs flower__leafs--2';
    flower2.appendChild(leafs2);

    for(let i=1; i<=4; i++) {
        const l = document.createElement('div');
        l.className = `flower__leaf flower__leaf--${i}`;
        leafs2.appendChild(l);
    }

    const circle2 = document.createElement('div');
    circle2.className = 'flower__white-circle';
    leafs2.appendChild(circle2);

    for(let i=1; i<=8; i++) {
        const l = document.createElement('div');
        l.className = `flower__light flower__light--${i}`;
        leafs2.appendChild(l);
    }

    const line2 = document.createElement('div');
    line2.className = 'flower__line';
    flower2.appendChild(line2);

    for(let i=1; i<=4; i++) {
        const l = document.createElement('div');
        l.className = `flower__line__leaf flower__line__leaf--${i}`;
        line2.appendChild(l);
    }

    // Flower 3
    const flower3 = document.createElement('div');
    flower3.className = 'flower flower--3';
    flowers.appendChild(flower3);

    const leafs3 = document.createElement('div');
    leafs3.className = 'flower__leafs flower__leafs--3';
    flower3.appendChild(leafs3);

    for(let i=1; i<=4; i++) {
        const l = document.createElement('div');
        l.className = `flower__leaf flower__leaf--${i}`;
        leafs3.appendChild(l);
    }

    const circle3 = document.createElement('div');
    circle3.className = 'flower__white-circle';
    leafs3.appendChild(circle3);

    for(let i=1; i<=8; i++) {
        const l = document.createElement('div');
        l.className = `flower__light flower__light--${i}`;
        leafs3.appendChild(l);
    }

    const line3 = document.createElement('div');
    line3.className = 'flower__line';
    flower3.appendChild(line3);

    for(let i=1; i<=4; i++) {
        const l = document.createElement('div');
        l.className = `flower__line__leaf flower__line__leaf--${i}`;
        line3.appendChild(l);
    }

    // Grow Ans (Long)
    const growAns1 = document.createElement('div');
    growAns1.className = 'grow-ans';
    growAns1.style.setProperty('--d', '1.2s');
    flowers.appendChild(growAns1);

    const gLong = document.createElement('div');
    gLong.className = 'flower__g-long';
    growAns1.appendChild(gLong);
    
    const gLongTop = document.createElement('div');
    gLongTop.className = 'flower__g-long__top';
    gLong.appendChild(gLongTop);

    const gLongBottom = document.createElement('div');
    gLongBottom.className = 'flower__g-long__bottom';
    gLong.appendChild(gLongBottom);

    // Grass 1
    const grass1 = document.createElement('div');
    grass1.className = 'growing-grass';
    flowers.appendChild(grass1);

    const fGrass1 = document.createElement('div');
    fGrass1.className = 'flower__grass flower__grass--1';
    grass1.appendChild(fGrass1);

    const fGrassTop1 = document.createElement('div');
    fGrassTop1.className = 'flower__grass--top';
    fGrass1.appendChild(fGrassTop1);

    const fGrassBottom1 = document.createElement('div');
    fGrassBottom1.className = 'flower__grass--bottom';
    fGrass1.appendChild(fGrassBottom1);

    for(let i=1; i<=8; i++) {
        const l = document.createElement('div');
        l.className = `flower__grass__leaf flower__grass__leaf--${i}`;
        fGrass1.appendChild(l);
    }
    
    const overlay1 = document.createElement('div');
    overlay1.className = 'flower__grass__overlay';
    fGrass1.appendChild(overlay1);

    // Grass 2
    const grass2 = document.createElement('div');
    grass2.className = 'growing-grass';
    flowers.appendChild(grass2);

    const fGrass2 = document.createElement('div');
    fGrass2.className = 'flower__grass flower__grass--2';
    grass2.appendChild(fGrass2);

    const fGrassTop2 = document.createElement('div');
    fGrassTop2.className = 'flower__grass--top';
    fGrass2.appendChild(fGrassTop2);

    const fGrassBottom2 = document.createElement('div');
    fGrassBottom2.className = 'flower__grass--bottom';
    fGrass2.appendChild(fGrassBottom2);

    for(let i=1; i<=8; i++) {
        const l = document.createElement('div');
        l.className = `flower__grass__leaf flower__grass__leaf--${i}`;
        fGrass2.appendChild(l);
    }
    
    const overlay2 = document.createElement('div');
    overlay2.className = 'flower__grass__overlay';
    fGrass2.appendChild(overlay2);

    // Grow Ans (Right 1)
    const growAns2 = document.createElement('div');
    growAns2.className = 'grow-ans';
    growAns2.style.setProperty('--d', '2.4s');
    flowers.appendChild(growAns2);

    const gRight1 = document.createElement('div');
    gRight1.className = 'flower__g-right flower__g-right--1';
    growAns2.appendChild(gRight1);

    const leafRight1 = document.createElement('div');
    leafRight1.className = 'leaf';
    gRight1.appendChild(leafRight1);

    // Grow Ans (Right 2)
    const growAns3 = document.createElement('div');
    growAns3.className = 'grow-ans';
    growAns3.style.setProperty('--d', '2.8s');
    flowers.appendChild(growAns3);

    const gRight2 = document.createElement('div');
    gRight2.className = 'flower__g-right flower__g-right--2';
    growAns3.appendChild(gRight2);

    const leafRight2 = document.createElement('div');
    leafRight2.className = 'leaf';
    gRight2.appendChild(leafRight2);

    // Grow Ans (Front)
    const growAns4 = document.createElement('div');
    growAns4.className = 'grow-ans';
    growAns4.style.setProperty('--d', '2.8s');
    flowers.appendChild(growAns4);

    const gFront = document.createElement('div');
    gFront.className = 'flower__g-front';
    growAns4.appendChild(gFront);

    for(let i=1; i<=8; i++) {
        const w = document.createElement('div');
        w.className = `flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i}`;
        const l = document.createElement('div');
        l.className = 'flower__g-front__leaf';
        w.appendChild(l);
        gFront.appendChild(w);
    }

    const gFrontLine = document.createElement('div');
    gFrontLine.className = 'flower__g-front__line';
    gFront.appendChild(gFrontLine);

    // Grow Ans (Fr)
    const growAns5 = document.createElement('div');
    growAns5.className = 'grow-ans';
    growAns5.style.setProperty('--d', '3.2s');
    flowers.appendChild(growAns5);

    const gFr = document.createElement('div');
    gFr.className = 'flower__g-fr';
    growAns5.appendChild(gFr);

    const leafFr = document.createElement('div');
    leafFr.className = 'leaf';
    gFr.appendChild(leafFr);

    for(let i=1; i<=8; i++) {
        const l = document.createElement('div');
        l.className = `flower__g-fr__leaf flower__g-fr__leaf--${i}`;
        gFr.appendChild(l);
    }
}
