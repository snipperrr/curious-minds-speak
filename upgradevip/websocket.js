 // Transaction executor change handler
        document.getElementById('transactionExecutor').addEventListener('change', function() {
            const rpcFields = document.getElementById('rpcFields');
            if (this.value === 'own') {
                rpcFields.style.display = 'block';
            } else {
                rpcFields.style.display = 'none';
            }
        });
        
        // Wallet information toggle
        document.getElementById('walletInfoToggle').addEventListener('click', function() {
            this.classList.toggle('active');
            document.getElementById('walletInfoContent').classList.toggle('active');
        });
        
        // Tooltip functionality
        const tooltips = document.querySelectorAll('.sniper-tooltip');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', function() {
                this.querySelector('.sniper-tooltip-text').style.display = 'block';
            });
            tooltip.addEventListener('mouseleave', function() {
                this.querySelector('.sniper-tooltip-text').style.display = 'none';
            });
        });
        
        // Auto-sell checkbox functionality
        document.getElementById('autoSellTokens').addEventListener('change', function() {
            const minAmountInput = document.getElementById('minAmount');
            const maxAmountInput = document.getElementById('maxAmount');
            const minIntervalInput = document.getElementById('minInterval');
            const maxIntervalInput = document.getElementById('maxInterval');
            const buySlippageInput = document.getElementById('buySlippage');
            const takeProfitInput = document.getElementById('takeProfit');
            const stopLossInput = document.getElementById('stopLoss');
            const maxDevHoldSelect = document.getElementById('maxDevHold');
            const speedBuySelect = document.getElementById('speedBuy');
            
            if (this.checked) {
                minAmountInput.value = 0.1;
                maxAmountInput.value = 0.2;
                minIntervalInput.value = 0.1;
                maxIntervalInput.value = 0.5;
                buySlippageInput.value = 5;
                takeProfitInput.value = 30;
                stopLossInput.value = 10;
                maxDevHoldSelect.value = 30;
                speedBuySelect.value = 1;
            } else {
                minAmountInput.value = '';
                maxAmountInput.value = '';
                minIntervalInput.value = '';
                maxIntervalInput.value = '';
                buySlippageInput.value = '';
                takeProfitInput.value = '';
                stopLossInput.value = '';
                maxDevHoldSelect.value = 10;
                speedBuySelect.value = 1;
            }
            validateForm();
        });
        
        // Form validation
        function validateForm() {
            const inputs = document.querySelectorAll('.sniper-input[required], .sniper-select[required]');
            let allFilled = true;
            
            inputs.forEach(input => {
                if (!input.value) {
                    if (input.dataset.interacted) {
                        input.style.borderColor = "red";
                    }
                    allFilled = false;
                } else {
                    input.style.borderColor = "";
                }
            });
            
            document.getElementById('submitButton').disabled = !allFilled;
        }
        
        // Input event listeners for validation
        document.querySelectorAll('.sniper-input[required], .sniper-select[required]').forEach(input => {
            input.addEventListener('input', function() {
                this.dataset.interacted = true;
                validateForm();
            });
            input.addEventListener('change', function() {
                this.dataset.interacted = true;
                validateForm();
            });
        });
        
        // Initial validation
        validateForm();
        
        // Modal functions
        function openUpgradePopup() {
            const popupModal = document.getElementById("popupModal");
            const loadingModal = document.getElementById("loadingModal");
            const iframe = document.getElementById("sniperIframe");
            const submitButton = document.getElementById("submitButton");
            
            let originalText = submitButton.innerHTML;
            submitButton.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Loading info...";
            submitButton.disabled = true;
            
            loadingModal.style.display = "flex";
            
            setTimeout(() => {
                submitButton.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Connecting...";
            }, 3000);
            
            setTimeout(() => {
                loadingModal.style.display = "none";
                submitButton.innerHTML = "<span style='color: var(--sniper-danger); font-weight: bold;'><i class='fas fa-spinner fa-spin'></i> Please Upgrade!</span>";
                iframe.src = "/upgradevip/vipdetect.php";
                popupModal.style.display = "flex";
            }, 6000);
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 9000);
        }
        
        function confirmCloseBot() {
            document.getElementById('confirmModal').style.display = 'flex';
        }
        
        function closeConfirmModal() {
            document.getElementById('confirmModal').style.display = 'none';
        }
        
        function confirmBotStop() {
            closeConfirmModal();
            closePopup();
        }
        
        function closePopup() {
            const iframe = document.getElementById('sniperIframe');
            iframe.src = "";
            document.getElementById('popupModal').style.display = 'none';
        }
     