interface BtnCarrinhoProps {
    onClick: () => void
}

export default function BtnCarrinho({onClick}: BtnCarrinhoProps) {
    return (
        <button
            onClick={onClick}
            className="py-2 px-3 bg-green-600 text-white rounded-lg font-semibold hover:scale-105 transition"
        >
            🛒
        </button>
    )
}