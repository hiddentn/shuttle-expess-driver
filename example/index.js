let handler = null
const StartBtn = document.getElementById('btn')

const activeBtns = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
}

StartBtn.addEventListener('click', async () => {
    handler = await ShuttleExpress.init();
    console.log(handler);
    handler.addEventListener('shuttleebuttondown', (e) => {
        console.log("Btn Clicked :", e.button);
        activeBtns[e.button] = true;
        updateUi()
    })
    handler.addEventListener('shuttleebuttonup', (e) => {
        console.log("Btn UnClicked :", e.button);
        activeBtns[e.button] = false;
        updateUi()

    })

    handler.addEventListener('shuttlerollup', (e) => {
        console.log("Roller UP :", e.value);
        updateUi()

    })
    handler.addEventListener('shuttlerolldown', (e) => {
        console.log("Roller DOWN :", e.value);
        updateUi()

    })

    handler.addEventListener('shuttlescrollup', (e) => {
        console.log("Scroll UP ");
        updateUi()

    })
    handler.addEventListener('shuttlescrolldown', (e) => {
        console.log("Scroll DOWN");
        updateUi()

    })
})


const updateUi = () => {
    for (let i = 0; i < 5; i++) {
        let btn = document.getElementById(`btn-${i}`)
        if (btn) {
            if (activeBtns[i]) {
                btn.setAttribute('fill', 'red')
            } else {
                btn.setAttribute('fill', '#000')
            }
        }
    }

}

