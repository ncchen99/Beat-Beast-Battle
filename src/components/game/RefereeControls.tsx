interface RefereeControlsProps {
    onStart: () => void
    onPass: () => void
    onFail: () => void
    isActive: boolean
}

export default function RefereeControls({
    onStart,
    onPass,
    onFail,
    isActive,
}: RefereeControlsProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {!isActive ? (
                <button
                    onClick={onStart}
                    className="pixel-button text-pixel-sm bg-pixel-blue text-white px-4 py-2"
                >
                    ▶ 開始
                </button>
            ) : (
                <>
                    <button
                        onClick={onPass}
                        className="pixel-button text-pixel-sm bg-pixel-green text-white px-4 py-2"
                    >
                        ✓ 通過
                    </button>
                    <button
                        onClick={onFail}
                        className="pixel-button text-pixel-sm bg-pixel-red text-white px-4 py-2"
                    >
                        ✗ 失敗
                    </button>
                </>
            )}
        </div>
    )
}
