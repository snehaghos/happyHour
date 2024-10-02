import React from 'react'

const Stylex = () => {
    const styles = stylex.create({
        button: {
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
        },
    });
    return (
        <>
            <div>

                <button className={stylex(styles.button)}>Click me</button>
            </div>
        </>
    )
}

export default Stylex