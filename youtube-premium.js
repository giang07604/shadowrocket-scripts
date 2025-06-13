/**
 * Unlock YouTube Premium Features (AdBlock, Background, PiP)
 * By: Giang Coder
 */

let body = $response.body;

try {
    const obj = JSON.parse(body);

    // 🛑 Chặn quảng cáo (ad slots, midrolls...)
    delete obj.adPlacements;
    delete obj.playerAds;
    delete obj.adSlots;
    delete obj.playbackTracking;
    if (obj.responseContext?.adSlots) {
        delete obj.responseContext.adSlots;
    }

    // ✅ Unlock nền & PiP
    if (obj.playabilityStatus?.status === "OK") {
        obj.playerConfig = obj.playerConfig || {};
        obj.playerConfig.backgroundPlayback = true;
    }

    if (obj.streamingData?.adaptiveFormats) {
        for (const format of obj.streamingData.adaptiveFormats) {
            if (format.mimeType?.includes("audio/")) {
                format.targetDurationSec = 86400; // giữ âm thanh liên tục
            }
        }
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("❌ Error in YouTube Premium Script:", e);
}

$done({ body });
