document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.getElementById("envelope");
    const flap = document.getElementById("flap");
    const seal = document.getElementById("seal");
    const miniLetter = document.getElementById("mini-letter");
    const passcodeInput = document.getElementById("passcode-input");
    const reactionFace = document.getElementById("reacting-face");
    const fullLetterScene = document.getElementById("full-letter-scene");
    const envelopeScene = document.getElementById("envelope-scene");
    const gallery = document.getElementById("image-gallery");

    const titles = [
        "أميرتي الصغنونة.. 👑", "الشمس اللي بتنور دنيتي.. ☀️", "أحلى ابتسامة في الكوكب.. ✨",
        "جمالك ملوش حدود.. 🌸", "ملامحك الملائكية.. 👼", "أرق قلب في الكون.. ❤️",
        "المبدعة والفنانة.. 🎨", "قطتي الصغنونة.. 🐱", "أغلى نعمة في حياتي.. 💎",
        "ضحكتك هي الموسيقى.. 🎶", "ذكاء وجمال وقوة.. 💪", "رفيقة دربي وحياتي.. 🌟",
        "عيني بتلمع لما بشوفك.. 😍", "كمال العالم فيكي.. 🌎", "إلى الأبد مع بعض.. ♾️"
    ];

    // Inject 15 images
    for (let i = 1; i <= 15; i++) {
        const section = document.createElement("section");
        section.className = "story-step";
        section.innerHTML = `
            <h2 class="step-title">${titles[i-1]}</h2>
            <div class="frame-container">
                <img src="${i}.jpeg" class="photo-frame" alt="هموسة">
            </div>
        `;
        gallery.appendChild(section);
    }

    gsap.registerPlugin(ScrollTrigger);

    // Opening Envelope
    envelope.addEventListener("click", () => {
        const tl = gsap.timeline();
        tl.to(seal, { scale: 0, opacity: 0, duration: 0.3 })
          .to(flap, { rotateX: 160, duration: 0.8, ease: "power2.inOut" })
          .set(flap, { zIndex: 1 })
          .to(miniLetter, { y: -120, duration: 0.6, ease: "back.out(1.7)" })
          .to(".passcode-container", { opacity: 1, duration: 0.3, onComplete: () => passcodeInput.focus() });
    });

    // Passcode Auto-Detect
    passcodeInput.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        if (val === "بحبك") {
            reactionFace.innerText = "😍";
            unlock();
        } else if ("بحبك".startsWith(val) && val !== "") {
            reactionFace.innerText = "🤔";
        } else if (val === "") {
            reactionFace.innerText = "🤨";
        } else {
            reactionFace.innerText = "☹️";
        }
    });

    function unlock() {
        gsap.timeline()
            .to(envelopeScene, { opacity: 0, duration: 0.8, delay: 0.4, display: "none" })
            .set(fullLetterScene, { display: "block" })
            .to(fullLetterScene, { opacity: 1, duration: 1, onComplete: () => {
                document.body.style.overflow = "auto";
                initScrollAnimations();
            }});
    }

    function initScrollAnimations() {
        gsap.utils.toArray(".story-step").forEach((step) => {
            gsap.from(step, {
                opacity: 0, y: 100, duration: 1,
                scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                }
            });
        });
    }

    // Create Floating Particles
    for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.innerText = ["💖", "✨", "🌸", "⭐", "🎈"][Math.floor(Math.random() * 5)];
        p.style.position = "fixed";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.fontSize = (Math.random() * 20 + 10) + "px";
        p.style.opacity = "0.4";
        document.getElementById("particles").appendChild(p);
        
        gsap.to(p, {
            y: "-=100", x: "random(-20, 20)",
            duration: "random(3, 6)", repeat: -1, yoyo: true, ease: "sine.inOut"
        });
    }
});