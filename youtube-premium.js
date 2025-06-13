/***********************************************
> YouTube Premium Unlock by Giang Coder
- Chặn quảng cáo
- Cho phép phát nền
- Bật PiP
- Hiệu lực lâu dài
***********************************************/

try {
    let obj = JSON.parse($response.body);

    // Xóa quảng cáo
    delete obj.adPlacements;
    delete obj.playerAds;
    if (obj.responseContext?.adSlots) delete obj.responseContext.adSlots;
    delete obj.playbackTracking;

    // Giả lập Premium (chèn entitlement nếu app có check)
    obj.entitlements = {
        premium: {
            product_identifier: "com.youtube.premium.yearly",
            purchase_date: "2024-01-01T00:00:00Z",
            expires_date: "2099-12-31T23:59:59Z"
        }
    };

    // Cho phép phát nền
    if (obj.playabilityStatus?.status === "OK") {
        obj.playerConfig = obj.playerConfig || {};
        obj.playerConfig.backgroundPlayback = true;
    }

    // Thêm chú thích thương hiệu
    obj.Attention = "✔ Mở khoá YouTube Premium – by Giang Coder";

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("YouTube_GiangCoder Script Error:", e);
    $done({});
}
