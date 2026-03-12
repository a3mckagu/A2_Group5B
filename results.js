// results.js — Result overlay screens for level outcomes
// Drawn inside the BASE_WIDTH / BASE_HEIGHT coordinate space,
// called from within levelInstance.draw() after the game layer.
//
// Three result types matching levelInstance.levelResult:
//   "CORRECT"  → Well Brewed!    (green banner)
//   "WRONG"    → Wrong Potion!   (red banner)
//   "TIMEOUT"  → Too Slow!       (navy banner, yellow heading)
//
// Fonts used:
//   Manufacturing Consent — headings
//   IM Fell English       — quote body + attribution
//   VT323                 — status label + button

const Results = {
  // ── Button rect in BASE coords (set each draw, read in mousePressed) ──
  _playAgainBtn: { x: 0, y: 0, w: 0, h: 0 },

  // ── Unfurl animation state ──
  _unfurlStart: null, // millis() when current result was first drawn
  _lastResult: null, // track result changes to reset animation

  // ── Public draw entry point ──
  // Call this from inside the scaled push()/pop() block in drawLevel(),
  // after levelInstance.draw().
  draw: function (type) {
    if (!type) return;

    // Reset animation when result type changes
    if (type !== Results._lastResult) {
      Results._unfurlStart = millis();
      Results._lastResult = type;
    }

    const elapsed = millis() - Results._unfurlStart;
    const UNFURL_MS = 650; // total unfurl duration
    // Eased 0→1 progress for clip reveal
    const rawP = constrain(elapsed / UNFURL_MS, 0, 1);
    const progress = 1 - pow(1 - rawP, 3); // ease-out cubic

    const cx = BASE_WIDTH / 2;

    // ── Dim ──
    push();
    noStroke();
    fill(0, map(progress, 0, 1, 0, 210));
    rectMode(CORNER);
    rect(0, 0, BASE_WIDTH, BASE_HEIGHT);
    pop();

    // ── Colour palette per result ──
    let faceHi, faceLo, rodCol, trimCol, innerBorder;
    let headingCol, statusCol, bodyCol, attrCol, btnBorderCol, btnTextCol;
    let headingText, statusText, quoteText, attrText, btnLabel;

    if (type === "CORRECT") {
      faceHi = color(30, 107, 30);
      faceLo = color(13, 61, 13);
      rodCol = color(42, 24, 8);
      trimCol = color(200, 160, 48);
      innerBorder = color(10, 42, 10);
      headingCol = color(160, 240, 128);
      statusCol = color(120, 200, 96);
      bodyCol = color(216, 240, 208);
      attrCol = color(144, 192, 128);
      btnBorderCol = color(112, 192, 80);
      btnTextCol = color(160, 240, 128);
      headingText = "Well Brewed!";
      statusText = "\u2736  Order Fulfilled  \u2736";
      quoteText =
        "Remarkable! I can already feel the odds\nshifting in my favour. You have a gift.";
      attrText = "\u2014 Lord Alistair, unusually pleased";
      btnLabel = "PLAY AGAIN \u203A";
    } else if (type === "WRONG") {
      faceHi = color(192, 40, 40);
      faceLo = color(122, 16, 16);
      rodCol = color(42, 24, 8);
      trimCol = color(200, 160, 48);
      innerBorder = color(90, 14, 14);
      headingCol = color(255, 224, 224);
      statusCol = color(240, 144, 144);
      bodyCol = color(248, 232, 232);
      attrCol = color(192, 152, 152);
      btnBorderCol = color(224, 112, 112);
      btnTextCol = color(255, 224, 224);
      headingText = "Wrong Potion!";
      statusText = "\u2717  Order Failed  \u2717";
      quoteText =
        "This smells nothing like Beginner's Luck!\nI asked for fortune, not a biohazard.";
      attrText = "\u2014 Lord Alistair, deeply unimpressed";
      btnLabel = "TRY AGAIN \u203A";
    } else {
      // TIMEOUT
      faceHi = color(26, 30, 80);
      faceLo = color(12, 16, 48);
      rodCol = color(42, 24, 8);
      trimCol = color(200, 160, 48);
      innerBorder = color(10, 12, 40);
      headingCol = color(232, 216, 64);
      statusCol = color(192, 176, 48);
      bodyCol = color(216, 224, 248);
      attrCol = color(152, 152, 200);
      btnBorderCol = color(200, 184, 32);
      btnTextCol = color(232, 216, 64);
      headingText = "Too Slow!";
      statusText = "\u25c8  Order Abandoned  \u25c8";
      quoteText =
        "I am a lord, not a patient man.\nMy luck won't wait forever and neither shall I.";
      attrText = "\u2014 Lord Alistair, already halfway out the door";
      btnLabel = "TRY AGAIN \u203A";
    }

    // ── Banner dimensions ──
    const BW = 580; // banner width
    const BH = 320; // banner height (body only, excluding rod)
    const ROD_H = 18;
    const ROD_Y = 20; // rod centre Y (from banner top)
    const BODY_TOP = ROD_Y + 12; // where fabric starts
    const POINT_H = 44; // depth of pointed bottom
    const bx = cx - BW / 2; // banner left edge

    // Total SVG height including rod area
    const totalH = ROD_Y + ROD_H / 2 + BH + POINT_H + 10;

    // Unfurl: clip from top, revealing downward
    const revealH = totalH * progress;

    // Banner draws at top of screen
    const bannerTopY = 0;

    push();
    // Clip to revealed region only
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, bannerTopY, BASE_WIDTH, revealH);
    drawingContext.clip();

    Results._drawBanner({
      cx,
      bx,
      BW,
      BH,
      ROD_Y,
      ROD_H,
      BODY_TOP,
      POINT_H,
      faceHi,
      faceLo,
      rodCol,
      trimCol,
      innerBorder,
      progress,
    });

    // ── Text (fades in after banner is mostly revealed) ──
    const textFade = constrain(map(progress, 0.55, 1.0, 0, 1), 0, 1);
    if (textFade > 0) {
      Results._drawText({
        cx,
        BW,
        BODY_TOP,
        BH,
        headingText,
        statusText,
        quoteText,
        attrText,
        btnLabel,
        headingCol,
        statusCol,
        bodyCol,
        attrCol,
        btnBorderCol,
        btnTextCol,
        textFade,
      });
    }

    drawingContext.restore();
    pop();

    // no Back-to-Start button
  },

  // ── Draw the banner shape (rod + fabric + point) ──
  _drawBanner: function ({
    cx,
    bx,
    BW,
    BH,
    ROD_Y,
    ROD_H,
    BODY_TOP,
    POINT_H,
    faceHi,
    faceLo,
    rodCol,
    trimCol,
    innerBorder,
  }) {
    const GOLD_INSET = 10; // gold border inset from fabric edge
    const FACE_INSET = 18; // face inset from fabric edge
    const INNER_INSET = 26; // inner border inset from fabric edge

    // ── Gold outer border ──
    push();
    noStroke();
    fill(trimCol);
    // body rect
    rectMode(CORNER);
    rect(bx, BODY_TOP, BW, BH);
    // pointed bottom
    beginShape();
    vertex(bx, BODY_TOP + BH);
    vertex(bx + BW, BODY_TOP + BH);
    vertex(cx, BODY_TOP + BH + POINT_H);
    endShape(CLOSE);
    pop();

    // ── Fabric face — pentagon matching gold border shape, inset by GOLD_INSET ──
    push();
    noStroke();
    const faceTopY = BODY_TOP + GOLD_INSET;
    const faceBottomY = BODY_TOP + BH;
    const facePointY = BODY_TOP + BH + POINT_H - GOLD_INSET; // inset point
    const faceMidY = faceTopY + (faceBottomY - faceTopY) / 2;
    const faceL = bx + GOLD_INSET;
    const faceR = bx + BW - GOLD_INSET;

    // Full face shape (darker colour) — rectangle + inset point
    fill(faceLo);
    beginShape();
    vertex(faceL, faceTopY); // top-left
    vertex(faceR, faceTopY); // top-right
    vertex(faceR, faceBottomY); // bottom-right
    vertex(cx, facePointY); // bottom point
    vertex(faceL, faceBottomY); // bottom-left
    endShape(CLOSE);

    // No top-half overlay: fabric face is a single inset shape matching gold trim
    pop();

    // ── Inner border line ──
    push();
    stroke(innerBorder);
    strokeWeight(2);
    noFill();
    beginShape();
    vertex(bx + INNER_INSET, BODY_TOP + GOLD_INSET);
    vertex(bx + BW - INNER_INSET, BODY_TOP + GOLD_INSET);
    vertex(bx + BW - INNER_INSET, BODY_TOP + BH - 4);
    vertex(cx, BODY_TOP + BH + POINT_H - INNER_INSET - 4);
    vertex(bx + INNER_INSET, BODY_TOP + BH - 4);
    endShape(CLOSE);
    pop();

    // ── Gold top trim bar (covers top of fabric) ──
    push();
    noStroke();
    fill(trimCol);
    rectMode(CORNER);
    rect(bx, BODY_TOP - 6, BW, GOLD_INSET + 6);
    pop();

    // ── Rod ──
    push();
    noStroke();
    // rod body
    fill(rodCol);
    rectMode(CENTER);
    rect(cx, ROD_Y, BW + 40, ROD_H, ROD_H / 2);
    // rod highlight
    fill(80, 50, 20, 120);
    rect(cx, ROD_Y - 3, BW + 40, ROD_H / 2, ROD_H / 4);
    // left finial
    fill(rodCol);
    circle(bx - 20, ROD_Y, 28);
    fill(60, 38, 14, 160);
    circle(bx - 24, ROD_Y - 5, 10);
    // right finial
    fill(rodCol);
    circle(bx + BW + 20, ROD_Y, 28);
    fill(60, 38, 14, 160);
    circle(bx + BW + 16, ROD_Y - 5, 10);
    pop();

    // ── Fabric loops (5 evenly spaced) ──
    push();
    noStroke();
    const loopPositions = [0.18, 0.32, 0.5, 0.68, 0.82];
    loopPositions.forEach((t) => {
      const lx = bx + BW * t - 9;
      // loop body
      fill(red(trimCol) * 0.75, green(trimCol) * 0.75, blue(trimCol) * 0.75);
      rectMode(CORNER);
      rect(lx, ROD_Y - ROD_H / 2 - 2, 18, 22, 4);
      // loop shadow at bottom
      fill(red(trimCol) * 0.5, green(trimCol) * 0.5, blue(trimCol) * 0.5);
      rect(lx, ROD_Y + 4, 18, 8, 2);
    });
    pop();
  },

  // ── Draw text content over the banner ──
  _drawText: function ({
    cx,
    BW,
    BODY_TOP,
    BH,
    headingText,
    statusText,
    quoteText,
    attrText,
    btnLabel,
    headingCol,
    statusCol,
    bodyCol,
    attrCol,
    btnBorderCol,
    btnTextCol,
    textFade,
  }) {
    const alpha = textFade * 255;
    const textAreaTop = BODY_TOP + 20;
    const textAreaBottom = BODY_TOP + BH - 16;
    const textAreaH = textAreaBottom - textAreaTop;

    push();
    textAlign(CENTER, TOP);

    // ── Heading ──
    textFont(FONT_MANUFACTURING_CONSENT);
    textSize(46);
    fill(red(headingCol), green(headingCol), blue(headingCol), alpha);
    noStroke();
    let y = textAreaTop + textAreaH * 0.03;
    text(headingText, cx, y);

    // ── Status ──
    y += 58;
    textFont(FONT_VT323);
    textSize(18);
    fill(red(statusCol), green(statusCol), blue(statusCol), alpha * 0.9);
    text(statusText, cx, y);

    // ── Ornament divider ──
    y += 24;
    stroke(red(attrCol), green(attrCol), blue(attrCol), alpha * 0.45);
    strokeWeight(1);
    line(cx - BW * 0.3, y, cx + BW * 0.3, y);
    noStroke();

    // ── Quote ──
    y += 12;
    textFont(FONT_IM_FELL_ENGLISH);
    textStyle(ITALIC);
    textSize(17);
    fill(red(bodyCol), green(bodyCol), blue(bodyCol), alpha);
    text(quoteText, cx, y);
    textStyle(NORMAL);

    // ── Attribution ──
    y += 66;
    textSize(14);
    textAlign(CENTER, TOP);
    fill(red(attrCol), green(attrCol), blue(attrCol), alpha * 0.85);
    text(attrText, cx, y);

    // ── Button ──
    const btnW = 200;
    const btnH = 36;
    const btnX = cx - btnW / 2;
    const btnY = textAreaBottom - btnH - 8;

    Results._playAgainBtn = { x: btnX, y: btnY, w: btnW, h: btnH };

    stroke(
      red(btnBorderCol),
      green(btnBorderCol),
      blue(btnBorderCol),
      alpha * 0.7,
    );
    strokeWeight(1);
    noFill();
    rectMode(CORNER);
    rect(btnX, btnY, btnW, btnH, 4);

    noStroke();
    fill(red(btnTextCol), green(btnTextCol), blue(btnTextCol), alpha);
    textFont(FONT_VT323);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(btnLabel, cx, btnY + btnH / 2);

    pop();
  },

  // ── Back to Start button below the banner point ──
  // Back button removed — results panel uses only Play Again

  // ── Mouse handler ──
  // Call from levelMousePressed() when levelInstance.levelResult is set.
  // mx / my are already in BASE coords (divide out scale/offset before calling).
  mousePressed: function (mx, my) {
    const pa = Results._playAgainBtn;

    // Play Again / Try Again
    if (mx >= pa.x && mx <= pa.x + pa.w && my >= pa.y && my <= pa.y + pa.h) {
      // Reset the level instance
      Results._unfurlStart = null;
      Results._lastResult = null;
      levelInstance.levelResult = null;
      levelInstance.patienceStart = null;
      levelInstance.patiencePaused = false;
      levelInstance.patienceElapsedAtPause = 0;
      levelInstance.patienceDisplayFrac = 1;
      levelInstance.orderStarted = false;
      levelInstance.cauldronSequence = [];
      levelInstance.crystalAdded = false;
      levelInstance.vials.forEach((v) => {
        v.used = false;
        v.isHeld = false;
        v.isMoving = false;
        v.isSelected = false;
        v.progress = 0;
        v.scale = 1.0;
        v.targetScale = 1.0;
        v.img = v.closedImg;
        v.x = v.startX;
        v.y = v.startY;
        if (v.isCrystal) {
          v.x = layout.crystal.x;
          v.y = layout.crystal.y;
        }
      });
      return;
    }

    // Back to Start removed
  },

  // Reset animation state (call if you want a fresh unfurl on next show)
  reset: function () {
    Results._unfurlStart = null;
    Results._lastResult = null;
  },
};

window.Results = Results;
