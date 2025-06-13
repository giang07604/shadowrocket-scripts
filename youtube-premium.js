let body = $response.body;

try {
    const obj = JSON.parse(body);

    // Chặn quảng cáo
    delete obj.adPlacements;
    delete obj.playerAds;
    delete obj.adSlots;

    if (obj.responseContext?.adSlots) {
        delete obj.responseContext.adSlots;
    }

    // Mở phát nền và PiP
    const playability = obj.playabilityStatus;
    if (playability?.status === "OK") {
        obj.playerConfig = obj.playerConfig || {};
        obj.playerConfig.backgroundPlayback = true;
    }

    // Xoá tracking
    delete obj.playbackTracking;

    body = JSON.stringify(obj);
} catch (e) {
    console.log("YouTube script error: " + e);
}

$done({ body });
