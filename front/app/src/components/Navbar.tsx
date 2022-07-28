import '../styles/components/Navbar.css'

export function Navbar() {

    function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        return;
    }

    return (
        <div className="navbar-container" >
            <form action="" className="navbar-form" onSubmit={handleSubmit} >
                <input placeholder="First Name" />
                <input placeholder="Second Name" />
                <input
                    placeholder="Participation"
                    type="number"
                    min="0"
                />
                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    )
}