/**
 * YouTube Ad Block + Background + PiP (Stable)
 * Author: Giang Coder
 */

let body = $response.body;

try {
    const obj = JSON.parse(body);

    // 1. Chặn quảng cáo (an toàn)
    delete obj.adPlacements;
    delete obj.playerAds;
    if (obj.responseContext?.adSlots) {
        delete obj.responseContext.adSlots;
    }

    // 2. Xoá tracking
    delete obj.playbackTracking;

    // 3. Bật phát nền và PiP (premium giả lập)
    if (obj.playabilityStatus?.status === "OK") {
        obj.playerConfig = obj.playerConfig || {};
        obj.playerConfig.backgroundPlayback = true;
    }

    // ⚠ KHÔNG đụng vào streamingData để tránh lỗi
    // (YouTube sẽ không giải được video nếu signatureCipher sai)

    body = JSON.stringify(obj);
} catch (e) {
    console.log("YouTube patch error:", e);
}

$done({ body });
