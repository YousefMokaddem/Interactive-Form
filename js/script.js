//flags for checking on submit
var nameValid = false;
var emailValid = false;
var cvvValid = false;
var cardValid = false;
var zipValid = false;
//some selectors
const $nameField = $('#name');
const $emailField = $('#mail');
const $card = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $otherField = $('#other-title');
const $tDesign = $('#design');
const $tColor = $('#color');
const $creditCard = $('#credit-card');
const paypal = $creditCard.next();
const bitcoin = $creditCard.next().next();
//placed activities in an array for index simplicity, as the label was the first child of activities
const activities = [];
var total = 0;
$('.activities').append(`<p>Total: $<span id='total'>${total}</span></p>`);

for (let i = 1; i < $('.activities').children().length; i++){
    activities.push($('.activities').children()[i].firstElementChild);
}

$nameField.focus();
$otherField.hide();
paypal.hide();
bitcoin.hide();
$tColor.hide();
$tColor.parent().hide();

//job role selector
$('#title').on('input',function(e){
    if (this.value === 'other'){
        $otherField.show();
    }else{
        $otherField.hide();
    }
});

//T-Shirt Info functionality
$tDesign.on('input',function(e){
    if(this.value === "js puns"){
        $tColor.show();
        $tColor.parent().show();    
        //update field
        $($tColor.children()[3]).attr('selected', false);
        $($tColor.children()[0]).attr('selected', true);
        //update menu
        for(let i = 0; i<$tColor.children().length; i++){
            if(i < 3){
                $($tColor.children()[i]).show();
            }else{
                $($tColor.children()[i]).hide();
            } 
        }
    }else if(this.value === "heart js"){
        $tColor.show();
        $tColor.parent().show();    
        //update field
        $($tColor.children()[0]).attr('selected', false);
        $($tColor.children()[3]).attr('selected', true);
        //update menu
        for(let i = 0; i<$tColor.children().length; i++){
            if(i < 3){
                $($tColor.children()[i]).hide();
            }else{
                $($tColor.children()[i]).show();
            } 
        }
    }else{
        //hide options
        $tColor.hide();
        $tColor.parent().hide();
        //show all
        // for(let i = 0; i<$tColor.children().length; i++){
        //     $($tColor.children()[i]).show();
        // }
    }
});

//Register for Activities functionality
$('.activities').on('input', function(e){
    /*these functions don't make the code more dry,
    but help make it more readable*/
    function disable(index){
        $(activities[index]).attr('disabled', true)
            .parent().css('text-decoration', 'line-through');
    }
    function enable(index){
        $(activities[index]).attr('disabled', false)
            .parent().css('text-decoration', 'none');
    }
    //if the action was a check (not an uncheck) then add the price to the total, enable or disable options respecively
    if(e.target === activities[0]){
        if(e.target.checked){
            total += 200;
        }else{
            total -= 200;
        }
    }
    else if(e.target === activities[1]){
        if(e.target.checked){
            total += 100;
            disable(3);
            disable(5);
        }else{
            total -= 100;
            enable(3);
            enable(5);
        }
    }
    else if(e.target === activities[2]){
        if(e.target.checked){
            total += 100;
            disable(4);
            disable(6);
        }else{
            total -= 100;
            enable(4);
            enable(6);
        }
    }
    else if(e.target === activities[3]){
        if(e.target.checked){
            total += 100;
            disable(1);
            disable(5);
        }else{
            total -= 100;
            enable(1);
            enable(5);
        }
    }
    else if(e.target === activities[4]){
        if(e.target.checked){
            total += 100;
            disable(2);
            disable(6);
        }else{
            total -= 100;
            enable(2);
            enable(6);
        }
    }
    else if(e.target === activities[5]){
        if(e.target.checked){
            total += 100;
            disable(1);
            disable(3);
        }else{
            total -= 100;
            enable(1);
            enable(3);
        }
    }
    else if(e.target === activities[6]){
        if(e.target.checked){
            total += 100;
            disable(2);
            disable(4);
        }else{
            total -= 100;
            enable(2);
            enable(4);
        }
    }
    //reprint total
    $('#total').text(total);
    //if an option is selected hide the tooltip
    if(total > 0){
        $activityTip.hide();
    }
});


//display payment info based on selected payment option
$('#payment').on('input', function(e){
    if(this.value === 'paypal'){
        $creditCard.hide();
        $(bitcoin).hide();
        $(paypal).show();
    }else if(this.value === 'bitcoin'){
        $creditCard.hide();
        $(bitcoin).show();
        $(paypal).hide();
    }else if(this.value === 'credit card'){
        $creditCard.show();
        $(bitcoin).hide();
        $(paypal).hide();
    }
});

/*CREATE, APPEND AND HIDE TOOLTIPS*/
const $nameTip = $('<p>Name must not be blank</p>');
$nameTip.css('color','red');
$nameTip.insertBefore($nameField);
$nameTip.hide();

const $emailTip = $('<p>Please enter a valid email</p>');
$emailTip.css('color','red');
$emailTip.insertBefore($emailField);
$emailTip.hide();

const $activityTip = $('<p>Please select at least one activity</p>');
$activityTip.css('color','red');
$('.activities').prepend($activityTip);
$activityTip.hide();

var $cardTip = $('<p>Please enter a card number between 13 and 16 digits</p>');
$cardTip.css('color','red');
$creditCard.prepend($cardTip);
$cardTip.hide();

const $zipTip = $('<p>Please enter a 5 digit zip code</p>');
$zipTip.css('color','red');
$creditCard.prepend($zipTip);
$zipTip.hide();

const $cvvTip = $('<p>Please enter a 3 digit ccv</p>');
$cvvTip.css('color','red');
$creditCard.prepend($cvvTip);
$cvvTip.hide();
/*VALIDATORS*/

//can't be blank
function isValidUsername(username){
    return /^\w+$/.test(username);
}
//valid email
function isValidEmail(email){
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
//at least 1 activity selected
function isValidActivities(){
    return (total > 0);
}
//card 13-16 digits, here we have the conditional error message
function isValidCard(num){
    if (num.toString().length === 0){
        $cardTip.remove();
        $cardTip = $('<p>Please enter a card number</p>');
        $cardTip.css('color','red');
        $creditCard.prepend($cardTip);
        
    }else{
        $cardTip.remove();
        $cardTip = $('<p>Please enter a card number between 13 and 16 digits</p>');
        $cardTip.css('color','red');
        $creditCard.prepend($cardTip);
    }
    return /^\d{13,16}$/.test(num);
}
//5 digits
function isValidZip(zip){
    return /^\d{5}$/.test(zip);
}
//3 digits
function isValidCvv(cvv){
    return /^\d{3}$/.test(cvv);
}
/*I like the blur listener because the box won't be displaced until after the user is finished typing*/
$nameField.on('blur', function(e){
    if(!isValidUsername(this.value)){
        $nameTip.show();
        nameValid = false;
    }else{
        $nameTip.hide();
        nameValid = true;
    }
});
//using input listener here for real-time error messages
$emailField.on('input', function(e){
    if(!isValidEmail(this.value)){
        $emailTip.show();
        emailValid = false;
    }else{
        $emailTip.hide();
        emailValid = true;
    }
});
$card.on('blur', function(e){
    if(!isValidCard(this.value)){
        $cardTip.show();
        cardValid = false;
    }else{
        $cardTip.hide();
        cardValid = true;
    }
});
$zip.on('blur', function(e){
    if(!isValidZip(this.value)){
        $zipTip.show();
        zipValid = false;
    }else{
        $zipTip.hide();
        zipValid = true;
    }
});
$cvv.on('blur', function(e){
    if(!isValidCvv(this.value)){
        $cvvTip.show();
        cvvValid = false;
    }else{
        $cvvTip.hide();
        cvvValid = true;
    }
});

$('button[type="submit"]').on('click', function(e){
    //if the card payment option is selected make sure it is valid, if not trigger the validation listeners by focusing and blurring
    if($('#payment').val() === 'credit card'){
        if(!zipValid || !cvvValid || !cardValid){
            $card.focus().blur();
            $zip.focus().blur();
            $cvv.focus().blur();
            e.preventDefault();
        }
    }
    //make sure at least 1 activity selected
    if(!isValidActivities()){
        e.preventDefault();
        $activityTip.show();
    }
    //make sure name and email are valid
    else if(!nameValid || !emailValid){
        e.preventDefault();
    }
    //if all is valid e.preventDefault won't be called and the page will refresh
});